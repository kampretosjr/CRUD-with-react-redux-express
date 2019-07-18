import React, { Component } from 'react';
import { connect } from 'react-redux'
import MaterialTable from 'material-table'
import { readEvents } from '../actions'

function text(text) {
  if (text.length > 150) {
      let textSplit = text.substr(0, 150)
      return `${textSplit} ...`
  } else {
      let textSplit = text
      return `${textSplit}`
  }
}

class EventsIndex extends Component {
//bikin sate kosongan 
  state = {
    listData: [],
  };

//mengolah data yang sudah di tarik dari action 
  componentDidMount = async () => {
    await this.props.dispatch(readEvents());
    this.setState({
      //tampung di state list data
      listData: this.props.events,
    });
  };
  
  render() {
    console.log("evvent",this.props.events)
    console.log("props",this.props)
    console.log("ini list",list)
    
    const list = this.state.listData;       //tampung state di variable baru
    const arrayBaru = (Object.values(list)) // ubah kejadi array
    return (
      <div className="container">
        <div className="mt-5">
        <MaterialTable
          title="Data Peminjaman Buku"
          columns={[
            {
              title: 'Avatar',
              field: 'e',
              render: rowData => (
                <img src={rowData.e} style={{width:"100px", height:"100px"}}></img>
              ),
            },
            { title: 'No',       field: 'f' },
            { title: 'judul',    field: 'a' },
            { title: 'writer',   field: 'b' },
            { title: 'location', field: 'c' },
            { title: 'desc',     field: 'd' },
            
          ]}
          data= {arrayBaru.map((ress, index) =>{
            return(
              {
                f: ress.id,
                a: ress.nama_buku,
                b: ress.pengarang,
                c: ress.lokasi,
                d: text(ress.deskripsi),
                e:ress.foto_sampul,
              }
            ) 
                }
              )
            
          }       
          //  data={[
          //    list]}
              
          actions={[
            {
              icon: 'add',
              tooltip: 'Add User',
              isFreeAction: true,
              
              //onClick: (event) => alert("You want to add a new row")
            }
          ]}
        />
      
      </div></div>
    )
  }
}

const mapStateToProps = state => ({ events: state.events })

//const mapDispatchToProps = ({ readEvents })

export default connect(mapStateToProps)(EventsIndex)
