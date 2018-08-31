import {
    Route,
    childrenRoutePlugin,
    componentRoutePlugin,
    componentInitializerRoutePlugin,
    componentsRoutePlugin,
    createTitleRoutePlugin,
    redirectRoutePlugin,
    withRoutePlugin
  } from '@profiscience/knockout-contrib'
  
  Route.usePlugin(
    redirectRoutePlugin,
    withRoutePlugin,
    
    componentRoutePlugin,
    componentsRoutePlugin,
    componentInitializerRoutePlugin,
  
    /**
     * Assume that there is a top-level wrapper for the app-name
     */
    createTitleRoutePlugin(([appName, ...ts]) => `${appName} | ${ts.join(' > ')}`),
    childrenRoutePlugin,
  )
  