import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import RaiseButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import {  getEvent,
          deleteEvent,
          patchEvent 
        } from '../actions'

class EventsShow extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.onDeleteClick = this.onDeleteClick.bind(this)
  }

  componentDidMount() {
    const { id } = this.props.match.params
    if (id) this.props.getEvent(id)
  }

  renderField(field) {
    const { input, label, type, meta: { touched, error } } = field

    return (
      <TextField
        hintText={label}
        floatingLabelText={label}
        type={type}
        errorText={touched && error}
        {...input}
        fullWidth={true}
      />
    )
  }

  async onDeleteClick() {
    const { id } = this.props.match.params
    await this.props.deleteEvent(id)
    this.props.history.push('/')
  }

  async onSubmit(values) {
    await this.props.patchEvent(values)
    this.props.history.push('/')
  }

  render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props
    const style = { margin: 12 }

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div><Field label="Body" name="deskripsi" type="text" component={this.renderField} /></div>
        <div><Field label="Title" name="nama_buku" type="text"  component={this.renderField} /></div>
        <div><Field label="Body" name="foto_sampul" type="text" component={this.renderField} /></div>
        <div><Field label="Lokasi" name="lokasi" type="text" component={this.renderField} /></div>


        <RaiseButton label="Submit" type="submit" style={style} disabled={pristine || submitting || invalid} />
        <RaiseButton label="Cancel" style={style} containerElement={<Link to="/" />} />
        <RaiseButton label="Delete" style={style} onClick={this.onDeleteClick} />
      </form>
    )
  }
}

const validate = values => {
  const errors = {}

  if (!values.title) errors.title = "Enter a title, please."
  if (!values.body) errors.body = "Enter a body, please."

  return errors
}

const mapStateToProps = (state, ownProps) => {
  const event = state.events[ownProps.match.params.id]
  return { initialValues: event, event }
}

const mapDispatchToProps = ({ deleteEvent, getEvent, patchEvent })

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ validate, form: 'eventShowForm', enableReinitialize: true })(EventsShow)
)
