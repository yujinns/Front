import Header from 'layouts/Header'
import { Outlet } from 'react-router-dom'

export default function Container() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}
