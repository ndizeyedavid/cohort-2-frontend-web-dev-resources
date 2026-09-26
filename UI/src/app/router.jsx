import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout.jsx";

const HomePage = lazy(() => import("../features/home/HomePage.jsx"));
const ModulesPage = lazy(() => import("../features/modules/ModulesPage.jsx"));
const ModuleDetailPage = lazy(() => import("../features/modules/ModuleDetailPage.jsx"));
const LessonPage = lazy(() => import("../features/modules/LessonPage.jsx"));
const IcebreakersPage = lazy(() => import("../features/icebreakers/IcebreakersPage.jsx"));
const VideosPage = lazy(() => import("../features/videos/VideosPage.jsx"));
const QuizzesPage = lazy(() => import("../features/quizzes/QuizzesPage.jsx"));
const QuizRunnerPage = lazy(() => import("../features/quizzes/QuizRunnerPage.jsx"));
const ProgressPage = lazy(() => import("../features/progress/ProgressPage.jsx"));
const NotFoundPage = lazy(() => import("../features/home/NotFoundPage.jsx"));

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/modules" element={<ModulesPage />} />
        <Route path="/modules/:moduleId" element={<ModuleDetailPage />} />
        <Route path="/modules/:moduleId/:lessonId" element={<LessonPage />} />
        <Route path="/icebreakers" element={<IcebreakersPage />} />
        <Route path="/videos" element={<VideosPage />} />
        <Route path="/quizzes" element={<QuizzesPage />} />
        <Route path="/quizzes/:quizId" element={<QuizRunnerPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
