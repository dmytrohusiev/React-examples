import React from "react";
import propTypes from "prop-types";
import classes from "./PurchaseRegister.css";
import { CSSTransition } from "react-transition-group";
import { expenses } from "../../Dashboard/Tabs/Purchases/PurchasesTab";

function ExpensesSelection(props) {
	const { onChange, tag, expensesObj: expns } = props;
	const expensesObj = expns || expenses();

	const LabelText = `${tag || "div"}`;

	const expensesList = Object.keys(expensesObj).map(exp => (
		<div
			key={exp}
			className={[
				"col-12 col-md-3 my-2",
				classes.ExpensesWrapper,
				props[exp] ? classes.Yes : ""
			].join(" ")}>
			<input
				type="checkbox"
				name={exp}
				value={expensesObj[exp].title}
				className={classes.PurchaseInput}
				checked={props[exp]}
				readOnly
			/>
			<CSSTransition
				in={!props[exp]}
				timeout={500}
				classNames={{
					enterActive: classes.PurchRegAnimateOn,
					exitActive: classes.PurchRegAnimateOff
				}}>
				<label
					htmlFor={exp}
					className={[classes.PurchaseLabel, "row"].join(" ")}
					onClick={onChange}>
					{props[exp] && (
						<i className={["material-icons", classes.Yes].join(" ")} title={expensesObj[exp].title}>
							done
						</i>
					)}
					<img
						src={expensesObj[exp].img}
						alt={expensesObj[exp].title}
						className="col-9 img img-fluid p-0"
					/>
					<LabelText className="col-3 p-0 pt-3">{expensesObj[exp].title}</LabelText>
				</label>
			</CSSTransition>
		</div>
	));
	return expensesList;
}

ExpensesSelection.propTypes = {
	onChange: propTypes.func.isRequired,
	tag: propTypes.string,
	expensesObj: propTypes.object
};

export default ExpensesSelection;
