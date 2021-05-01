import css from 'style/FancyFont.module.css';

export default function FancyFont(props) {
    let className;
    return (
        <span className={`
            ${classSelector(props.style)} ${props.className}
        `}>
            {props.children}
        </span>
    );
}

function classSelector(style) {
    switch (style) {
        case "bold": return css.bold;
        case "lightBold": return css.lightBold;
        case "semiBold": return css.semiBold;
        default: return null;
    }
}