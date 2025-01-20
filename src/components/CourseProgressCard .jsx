import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Award, Clock, Target } from 'lucide-react';

const CourseProgressCard = ({ userProgress }) => {
  if (!userProgress) return null;

  const calculateProgress = () => {
    return (userProgress.completedLessons.length / userProgress.totalLessons) * 100;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="bg-black text-white">
      <CardHeader>
        <h3 className="text-2xl font-bold text-center text-cyan-400">
          Progreso del Curso
        </h3>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Bar Section */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-300">Progreso total</span>
            <span className="text-lg font-bold text-cyan-400">
              {calculateProgress().toFixed(1)}%
            </span>
          </div>
          <Progress 
            value={calculateProgress()} 
            className="h-2 bg-gray-700"
            
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg space-y-2">
            <div className="flex items-center gap-2 text-cyan-400">
              <BookOpen size={20} />
              <span className="font-semibold">Progreso Actual</span>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-300">
                Módulo: <span className="text-white font-medium">{userProgress.currentModule}</span>
              </p>
              <p className="text-sm text-gray-300">
                Lección: <span className="text-white font-medium">{userProgress.currentLesson}</span>
              </p>
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg space-y-2">
            <div className="flex items-center gap-2 text-cyan-400">
              <Award size={20} />
              <span className="font-semibold">Evaluaciones</span>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-300">
                Quiz: <span className="text-white font-medium">{userProgress.quizScore}%</span>
              </p>
              <p className="text-sm text-gray-300">
                Examen Final: 
                <span className={`ml-2 text-white font-medium ${userProgress.finalExamPassed ? 'text-green-400' : 'text-red-400'}`}>
                  {userProgress.finalExamPassed ? '✓ Aprobado' : '× Pendiente'}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="space-y-4 bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-cyan-400">
            <Clock size={20} />
            <span className="font-semibold">Línea de Tiempo</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Inicio:</span>
              <span className="text-white">{formatDate(userProgress.startedAt)}</span>
            </div>
            {userProgress.completedAt && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Completado:</span>
                <span className="text-white">{formatDate(userProgress.completedAt)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Lessons Progress */}
        <div className="space-y-4 bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-cyan-400">
            <Target size={20} />
            <span className="font-semibold">Lecciones Completadas</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">
              {userProgress.completedLessons.length} de {userProgress.totalLessons} lecciones
            </span>
            <span className="text-white font-medium">
              {((userProgress.completedLessons.length / userProgress.totalLessons) * 100).toFixed(1)}%
            </span>
          </div>
          <Progress 
            value={(userProgress.completedLessons.length / userProgress.totalLessons) * 100} 
            className="h-2 bg-gray-700"
           
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseProgressCard;