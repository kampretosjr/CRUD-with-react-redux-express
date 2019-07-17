import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import RaiseButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { postEvent } from '../actions'

class EventsNew extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
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

  async onSubmit(values) {
    await this.props.postEvent(values)
    this.props.history.push('/')
  }

  render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props
    const style = { margin: 12 }

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div><Field label="nama_buku"   name="nama_buku"   type="text" component={this.renderField} /></div>
        <div><Field label="pengarang"   name="pengarang"   type="text" component={this.renderField} /></div>
        <div><Field label="lokasi"      name="lokasi"   type="text" component={this.renderField} /></div>
        <div><Field label="foto_sampul" name="foto_sampul" type="text" component={this.renderField} /></div>
        <div><Field label="deskripsi"   name="deskripsi"   type="text" component={this.renderField} /></div>
        {/* <div><Field label="id_kategori" name="id_kategori"   type="text" component={this.renderField} /></div> */}

        <RaiseButton label="Submit" style={style} type="submit"  disabled={pristine || submitting || invalid} />
        <RaiseButton label="Cancel" style={style} containerElement={<Link to="/" />} />
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

const mapDispatchToProps = ({ postEvent })

export default connect(null, mapDispatchToProps)(
  reduxForm({ validate, form: 'eventNewForm' })(EventsNew)
)
