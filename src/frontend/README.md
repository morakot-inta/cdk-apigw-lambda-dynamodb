# Frontend implement step
## router
- install react-router-dom
- check user auth? if not use `NavLink` redirect to Login page.
- implement NavBar 
- create router from `createBrowserRouter` from `react-router-dom` 
```typescript
const router = createBroserRouter([
  {
    element: (
      <>
        <NavBar userName={userName}/>
        <Outlet />
      </>
    ),
    children: [
      {
        path: "/",
        element: <div>Hello world!</div>,
      },
      {
        path: "/login",
        element: <div>Login page</>
      }
    ]
  }
])

return (
  <div className="App">
    <RouterProvider router={router} />
  </div>
)
```

- create login component
- implement AuthService
