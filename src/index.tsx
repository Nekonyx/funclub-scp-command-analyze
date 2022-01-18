import './style.css'

import { render } from 'react-dom'

import { App } from './app'

const mountNode = document.getElementById('root')
render(<App />, mountNode)
