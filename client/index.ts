import './app'
import * as ko from 'knockout'
import { Router } from '@profiscience/knockout-contrib'
import './lib/router.plugins'

import home from './home'
import signup from './signup'

Router
  .useRoutes([
      home,
      signup
  ])

document.body.appendChild(document.createElement('app'))
ko.applyBindings({})

