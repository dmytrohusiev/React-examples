import React, { Component } from "react";
import propTypes from "prop-types";

import FacebookLogin from "./LoginElements/FacebookLogin";
import GoogleLogin from "./LoginElements/GoogleLogin";
import MailLogin from "./LoginElements/MailLogin";
import Register from "./Register";
import Button from "../Common/MaterialButton/MaterialButton";
import Collapse from "../Common/Collapse/Collapse";

import * as classes from "./style.css";

/**
 * @class ModularLogin
 * @extends {React.Component}
 * @property {string} redirectTo
 * @property {string} loginHeader
 * @property {string} registerHeader
 * @property {string} headerText
 * @property {string} idPrefix
 * @property {boolean} showAfterLogin
 */
class ModularLogin extends Component {
	state = {
		mode: "register",
		registerFormExpanded: false,
		isLoginFormExpanded: false
	};

	toggleMode = mode => {
		this.setState({ mode: mode });
	};

	componentDidMount() {
		let mode = this.state.mode;
		if (this.props.mode) {
			mode = this.props.mode;
		} else if (
			typeof localStorage !== "undefined" &&
			localStorage.getItem("pdd_is_registered") === "true"
		) {
			mode = "login";
		}
		this.setState({ mode });
	}

	showError = msg => {
		this.setState({ fbError: msg });
	};

	render() {
		const { redirectTo, showAfterLogin } = this.props;
		const { mode, registerFormExpanded, isLoginFormExpanded } = this.state;
		const idPrefix = this.props.idPrefix ? this.props.idPrefix : "";

		const contents = {};
		if (mode === "login") {
			contents.header =
				this.props.loginHeader || this.props.headerText || "Войдите в учетную запись";
			contents.emailButtonAriaControlsAndHref = `${idPrefix}emailLoginForm`;
			contents.form = (
				<Collapse icon={() => {}} isExpanded={mode === "login" && isLoginFormExpanded}>
					<MailLogin
						toggleMainModalMode={this.toggleMode}
						idPrefix={idPrefix}
						showAfterLogin={showAfterLogin}
						redirectTo={redirectTo}
					/>
				</Collapse>
			);
			contents.downPart = (
				<React.Fragment>
					<div className="col-12 mt-4 p-0">
						<p className={[classes.LoginOr, "text-center m-0"].join(" ")}>или</p>
					</div>
					<div className="col-md-8 mx-auto mt-4 text-center">
						<Button onClick={() => this.setState({ mode: "register" })} className="w-100">
							Зарегистрируйтесь
						</Button>
					</div>
				</React.Fragment>
			);
		}

		if (mode === "register") {
			contents.header =
				this.props.registerHeader ||
				this.props.headerText ||
				"Зарегистрируйтесь для входа в учетную запись";
			contents.emailButtonAriaControlsAndHref = `${idPrefix}registerForm`;
			contents.form = (
				<Collapse
					icon={param => {}}
					isExpanded={mode === "register" && registerFormExpanded}
					className="com-md-8 mx-auto mt-4 text-center"
					id={`${idPrefix}registerForm`}>
					<Register idPrefix={idPrefix} showAfterLogin={showAfterLogin} />
				</Collapse>
			);
			contents.downPart = (
				<React.Fragment>
					<div className="col-12 mt-4 p-0">
						<p className={[classes.LoginOr, "text-center m-0"].join(" ")}>или</p>
					</div>
					<div className="col-md-8 mx-auto mt-4 text-center">
						<Button onClick={() => this.setState({ mode: "login" })} className="w-100">
							Авторизируйтесь
						</Button>
					</div>
				</React.Fragment>
			);
		}

		if (mode === "password_reset") {
			contents.header = "Восстановление доступа к Вашей учетной записи";
			contents.form = (
				<MailLogin
					toggleMainModalMode={this.toggleMode}
					idPrefix={idPrefix}
					showAfterLogin={showAfterLogin}
					passwordResetFlag={true}
				/>
			);
			contents.downPart = null;
		}

		return (
			<div className="login" style={{ width: "560px", maxWidth: "100%" }}>
				<div className="container p-5">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="Logo">
								{/* <img src={logo} alt="Povertay" className="Logo col-8" /> */}
								<img src="/static/img/Logo_small.svg" style={{ width: "50%" }} />
							</h1>
							<p className="lead text-center py-4">{contents.header}</p>
							{mode !== "password_reset" && (
								<div className="row no-gutters col-12 mb-3 p-0 justify-content-between">
									<div className="col-4 justify-content-center d-flex">
										<FacebookLogin
											redirectTo={redirectTo}
											showAfterLogin={showAfterLogin}
											showError={this.showError}
										/>
									</div>
									<div className="col-4 justify-content-center d-flex">
										<GoogleLogin redirectTo={redirectTo} showAfterLogin={showAfterLogin} />
									</div>
									<div className="col-4 justify-content-center d-flex">
										<a
											className="social-login-button mail-login-button"
											data-toggle="collapse"
											href={
												mode === "register" ? "" : `#${contents.emailButtonAriaControlsAndHref}`
											}
											onClick={e => {
												e.preventDefault();
												mode === "register" &&
													this.setState({ registerFormExpanded: !registerFormExpanded });
												mode === "login" &&
													this.setState({ isLoginFormExpanded: !isLoginFormExpanded });
											}}
											role="button"
											aria-expanded="false"
											aria-controls={contents.emailButtonAriaControlsAndHref}>
											<i className="material-icons" style={{ fontSize: "2rem" }}>
												email
											</i>
										</a>
									</div>
									{this.state.fbError && (
										<div
											className="col-12 text-center pt-3"
											style={{ color: "#f26522", whiteSpace: "pre-line" }}>
											{this.state.fbError}
										</div>
									)}
								</div>
							)}
							{contents.form}
						</div>

						{contents.downPart}
						{mode === "register" && (
							<div className={["col-12 lead text-muted mt-5", classes.PDAcceptance].join(" ")}>
								Регистрируясь на сайте я подтверждаю своё согласие с{" "}
								<a
									href="/legal/personal-data"
									target="_blank"
									rel="noopener noreferrer"
									className={classes.Link}>
									заявлением об обработке персональных данных
								</a>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}

ModularLogin.propTypes = {
	redirectTo: propTypes.string,
	loginHeader: propTypes.string,
	registerHeader: propTypes.string,
	headerText: propTypes.string,
	idPrefix: propTypes.string
};

export default ModularLogin;
