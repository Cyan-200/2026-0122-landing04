import { RouteObject } from 'react-router-dom'
import { RootLayout } from './RootLayout'
import HomePage from '@/pages/home'
// import AboutPage from '@/pages/about'
// import PricingPage from '@/pages/pricing'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout cursorType="dot" cursorColor="#d4a574" cursorGlow />,
    children: [
      { index: true, element: <HomePage /> },
      // { path: 'about', element: <AboutPage /> },
      // { path: 'pricing', element: <PricingPage /> },
      // { path: '*', element: <NotFoundPage /> },
    ],
  },
]
