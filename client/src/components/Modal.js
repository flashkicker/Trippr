import React from "react"
import ReactDOM from "react-dom"

const Modal = props => {
	const { title, content, actions } = props
	return ReactDOM.createPortal(
		<div className="ui dimmer modals visible active" onClick={props.onDismiss}>
			<div
				className="ui standard modal visible active"
				onClick={event => {
					event.stopPropagation()
				}}
			>
				<div className="header">{title}</div>
				<div className="content">{content}</div>
				<div className="actions">{actions}</div>
			</div>
		</div>,
		document.querySelector("#modal")
	)
}

export default Modal
