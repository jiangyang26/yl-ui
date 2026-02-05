
import { App } from 'vue'

export { default as YlButton } from './button/index'
export { default as YlIcon } from './icon/index'
export { default as YlButtonGroup } from './button-group/index'
export { default as YlContainer } from './container/index'
export { default as YlHeader } from './header/index'
export { default as YlFooter } from './footer/index'
export { default as YlAside } from './aside/index'
export { default as YlMain } from './main/index'
export { default as YlRow } from './row/index'
export { default as YlCol } from './col/index'
export { default as YlLink } from './link/index'
export { default as YlText } from './text/index'




import Button from './button/index'
import Icon from './icon/index'
import ButtonGroup from './button-group/index'
import Container from './container/index'
import Header from './header/index'
import Footer from './footer/index'
import Aside from './aside/index'
import Main from './main/index'
import Row from './row/index'
import Col from './col/index'
import Link from './link/index'
import Text from './text/index'
import Scrollbar from './scrollbar/index'
import Space from './space/index'



const components = [
    Button,
    Icon,
    ButtonGroup,
    Container,
    Header,
    Footer,
    Aside,
    Main,
    Row,
    Col,
    Link,
    Text,
    Scrollbar,
    Space
] as const

const install = (app: App) => {
    components.forEach(c => {
        app.component(c.name!, c)
    })
}

export default { install }