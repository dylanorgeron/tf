import * as ko from 'knockout'
import template from './template.html'
import viewModel from './viewModel'
ko.components.register('app', {template, viewModel})