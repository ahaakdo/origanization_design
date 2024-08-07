import type { App } from 'vue'
import focus from './focus'
import throttle from './throttle'

const directive = {
    focus,
    throttle
}

export default {
    install(app: App) {
        Object.keys(directive).forEach((key) => {
            app.directive(key, directive[key])
        })
    }
}