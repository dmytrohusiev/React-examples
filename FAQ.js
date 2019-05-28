import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import PropTypes from "prop-types";

import classes from "./FAQ.css";
import Collapse from "../Common/Collapse/Collapse";
import { fetchFAQ } from "../../store/actions/faq";
import { loadModal } from "../../store/actions/modalActions";

class FAQ extends Component {
	static propTypes = {
		items: PropTypes.arrayOf(PropTypes.object),
		router: PropTypes.object.isRequired,
		fetchFAQ: PropTypes.func.isRequired,
		loadModal: PropTypes.func.isRequired,
		isAuthenticated: PropTypes.bool.isRequired
	};

	componentDidMount() {
		this.props.fetchFAQ();
	}

	toDeclaration = e => {
		e.preventDefault();
		e.stopPropagation();

		const { isAuthenticated, loadModal, router } = this.props;
		if (isAuthenticated) {
			router.push("/declaraciya");
		} else {
			loadModal("LOGIN_MODAL_DECLARACIYA");
		}
	};

	getContent = () => {
		const { items } = this.props;

		let contents = [];
		if (items.length === 0) return contents;
		items.forEach(qa => {
			if (qa.content.length > 1) {
				contents.push(
					<section key={qa._id}>
						<Collapse
							bodyClass={classes.CollapseBody}
							titleClass={classes.CollapseHeading}
							overflowClass={classes.CollapseOverflow}
							title={qa.title}>
							{qa.content.map(item => {
								return (
									<Collapse
										key={item._id}
										titleClass={classes.CollapseHeading}
										bodyClass={classes.CollapseBody}
										htag={3}
										title={item.title}>
										<span dangerouslySetInnerHTML={{ __html: item.content }} />
									</Collapse>
								);
							})}
						</Collapse>
					</section>
				);
			} else {
				contents.push(
					<section key={qa._id}>
						<Collapse
							bodyClass={classes.CollapseBody}
							titleClass={classes.CollapseHeading}
							title={qa.title}>
							{qa.content[0].content}
						</Collapse>
					</section>
				);
			}
		});
		return contents;
	};

	render() {
		return (
			<div className={["container-fluid mt-5"].join(" ")}>
				<div className="container py-4">
					<div className="row">
						<div className={["col-12", classes.Header].join(" ")}>
							<h1 className={classes.Header_text}>Чем мы можем вам помочь?</h1>
						</div>
					</div>
					<article className="row mt-5">
						<nav className={["px-0 col-12 col-lg-10 mx-lg-auto", classes.Block].join(" ")}>
							{this.getContent()}
						</nav>
					</article>
				</div>
				<input type="hidden" name="toDeclaration" id="toDeclaration" onClick={this.toDeclaration} />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	items: state.faq,
	isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
	fetchFAQ: () => dispatch(fetchFAQ()),
	loadModal: type => dispatch(loadModal(type))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(FAQ));
