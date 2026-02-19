// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import { BrowserRouter } from 'react-router'
import { lazy } from 'react'
import { Route } from 'react-router';
import { Routes } from 'react-router';

const LearningHookPage = lazy(() => import('./LearningBooks'));
const PostPage = lazy(() => import('./PostList'));
const PostDetailPage = lazy(() => import('./PostDetail'));

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/learning-hooks" element={
        <LearningHookPage />
      }></Route>
      <Route path="/post" element={
        <PostPage />
      }></Route>
      <Route path='/post/:id' element={
        <PostDetailPage/>
      }></Route>
      </Routes>
  </BrowserRouter>
)