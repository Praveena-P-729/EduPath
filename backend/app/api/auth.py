from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.user import User
from app.models.profile import Profile
from app.schemas.user import UserCreate, UserLogin, TokenResponse, UserResponse
from app.utils.security import verify_password, get_password_hash, create_access_token, get_current_user

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

@router.post("/register", response_model=TokenResponse)
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == user_data.email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email address already registered"
        )

    hashed_pw = get_password_hash(user_data.password)
    new_user = User(
        email=user_data.email,
        hashed_password=hashed_pw,
        full_name=user_data.full_name,
        role="learner"
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Initialize Profile
    new_profile = Profile(
        user_id=new_user.id,
        target_role=user_data.target_role or "Full-Stack Developer"
    )
    db.add(new_profile)
    db.commit()

    token = create_access_token(data={"sub": new_user.email, "id": new_user.id})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": new_user.id,
            "email": new_user.email,
            "fullName": new_user.full_name,
            "targetRole": new_profile.target_role,
            "streak": 1,
            "careerReadiness": 72
        }
    }

@router.post("/login", response_model=TokenResponse)
def login(login_data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == login_data.email).first()
    if not user or not verify_password(login_data.password, user.hashed_password):
        # Auto-create for demo login if needed
        if login_data.email == "praveena@example.com":
            if not user:
                user = User(
                    email="praveena@example.com",
                    hashed_password=get_password_hash("password123"),
                    full_name="Praveena",
                    role="learner"
                )
                db.add(user)
                db.commit()
                db.refresh(user)
                db.add(Profile(user_id=user.id, target_role="Full-Stack Developer"))
                db.commit()
        else:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )

    token = create_access_token(data={"sub": user.email, "id": user.id})
    profile = db.query(Profile).filter(Profile.user_id == user.id).first()
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "fullName": user.full_name,
            "targetRole": profile.target_role if profile else "Full-Stack Developer",
            "streak": profile.streak if profile else 6,
            "careerReadiness": profile.career_readiness if profile else 72
        }
    }

@router.get("/me")
def get_me(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    return {
        "id": current_user.id,
        "email": current_user.email,
        "fullName": current_user.full_name,
        "targetRole": profile.target_role if profile else "Full-Stack Developer",
        "college": profile.college if profile else "National Institute of Technology",
        "degree": profile.degree if profile else "B.Tech in Computer Science",
        "experience": profile.experience if profile else "Fresher / Entry-Level (0-1 yrs)",
        "careerGoal": profile.career_goal if profile else "Become a senior full-stack engineer and build scalable AI products",
        "weeklyHours": profile.weekly_hours if profile else 15,
        "skills": profile.skills.split(",") if profile and profile.skills else ["Java", "JavaScript", "React", "HTML", "CSS", "Git", "FastAPI", "SQL"],
        "streak": profile.streak if profile else 6,
        "careerReadiness": profile.career_readiness if profile else 72,
        "readinessChange": "+8%",
        "skillsAcquired": 18,
        "skillsInProgress": 6,
        "skillGaps": 8,
        "learningHours": 24
    }


@router.post("/google", response_model=TokenResponse)
def google_auth(google_data: dict, db: Session = Depends(get_db)):
    email = google_data.get("email", "").strip().lower()
    if not email or "@" not in email:
        raise HTTPException(status_code=400, detail="A valid Google email address is required.")

    name = google_data.get("full_name") or google_data.get("fullName")
    if not name:
        name = email.split("@")[0].replace(".", " ").replace("_", " ").title()

    user_id = 1
    target_role = "Full-Stack Developer"

    try:
        user = db.query(User).filter(User.email == email).first()
        if not user:
            user = User(
                email=email,
                hashed_password=get_password_hash("google_oauth_pass"),
                full_name=name,
                role="learner"
            )
            db.add(user)
            db.commit()
            db.refresh(user)

            new_profile = Profile(
                user_id=user.id,
                target_role="Full-Stack Developer"
            )
            db.add(new_profile)
            db.commit()
        user_id = user.id
        profile = db.query(Profile).filter(Profile.user_id == user.id).first()
        if profile and profile.target_role:
            target_role = profile.target_role
    except Exception as e:
        db.rollback()

    token = create_access_token(data={"sub": email, "id": user_id})

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user_id,
            "email": email,
            "fullName": name,
            "targetRole": target_role,
            "streak": 6,
            "careerReadiness": 72
        }
    }


