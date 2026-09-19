import { useState, useEffect } from 'react';
import progressService from '../services/progressService';
import learningService from '../services/learningService';

export const useProgress = () => {
  const [metrics, setMetrics] = useState(null);
  const [weeklyPlan, setWeeklyPlan] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProgress = async () => {
    setLoading(true);
    try {
      const [m, wp] = await Promise.all([
        progressService.getProgressMetrics(),
        learningService.getWeeklyPlan()
      ]);
      setMetrics(m);
      setWeeklyPlan(wp);
    } catch (err) {
      console.error('Failed to load progress data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  const calculateWeeklyCompletion = () => {
    if (!weeklyPlan || weeklyPlan.length === 0) return 0;
    const completedCount = weeklyPlan.filter(task => task.completed).length;
    return Math.round((completedCount / weeklyPlan.length) * 100);
  };

  const toggleTask = async (taskId) => {
    const updated = await learningService.toggleTaskCompletion(taskId);
    setWeeklyPlan(updated);
  };

  return {
    metrics,
    weeklyPlan,
    weeklyCompletionRate: calculateWeeklyCompletion(),
    loading,
    refreshProgress: fetchProgress,
    toggleTask,
  };
};

export default useProgress;
