import React, { PropTypes, Component} from 'react';
import { connect } from 'react-redux';
import { getCarriers, getFlights } from '../actions';
import {PageHeader, Grid, Col, Row} from 'react-bootstrap';
import {  BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class FilterableTable extends Component {
    componentDidMount() {
        this.props.getData();
    }
    render() {
        const dateFormatter = (cell) => {
            return new Date(cell).toLocaleString();
        };
        const fromFormatter = (cell) => {
            return cell.from;
        };
        const toFormatter = (cell) => {
            return cell.to;
        };
        const opts = this.props.carriers.map((val) => {
           return  <option value={val} key={val}>{val}</option>;
        });
        return (
            <Grid>
                <PageHeader>Перелеты</PageHeader>
                <Row>
                    <Col sm={3}>
                        <select className="form-control" ref="company" onClick={() => this.props.onFilter(this.refs.company.value)}>
                            <option value="все">Все авиакомпании</option>
                            {opts}
                        </select>
                        <br/>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <BootstrapTable  data={this.props.filteredData}>
                            <TableHeaderColumn dataField="id" isKey hidden>ID</TableHeaderColumn>
                            <TableHeaderColumn dataField="direction" dataFormat={fromFormatter}>Откуда</TableHeaderColumn>
                            <TableHeaderColumn dataField="direction" dataFormat={toFormatter}>Куда</TableHeaderColumn>
                            <TableHeaderColumn dataField="departure" dataFormat={dateFormatter} width="200">Время вылета</TableHeaderColumn>
                            <TableHeaderColumn dataField="arrival" dataFormat={dateFormatter} width="200">Время прилета</TableHeaderColumn>
                            <TableHeaderColumn dataField="carrier">Авиакомпания</TableHeaderColumn>
                        </BootstrapTable>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

FilterableTable.propTypes = {
    onFilter: PropTypes.func,
    getData: PropTypes.func,
    carriers: PropTypes.array,
    filteredData: PropTypes.array
};

const mapStateToProps = (state) => {
    return {
        filteredData: state.filteredData,
        carriers: state.carriers
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFilter: (filter) => dispatch(getFlights(filter)),
        getData: () => {
            dispatch(getCarriers());
            dispatch(getFlights());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterableTable);
