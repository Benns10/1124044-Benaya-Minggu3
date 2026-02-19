import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import { lazy, Suspense } from 'react'

const LearningHookPage = lazy(() => import('./LearningBooks'));
const PostPage = lazy(() => import('./PostList'));
const PostDetailPage = lazy(() => import('./PostDetail'));

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/learning-hooks" element={<LearningHookPage />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/post/:id" element={<PostDetailPage />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
)
