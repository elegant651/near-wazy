import React, { Component } from 'react'
import { connect } from 'react-redux'
import imageCompression from '../utils/imageCompression';
import ui from '../utils/ui'
import Input from './Input'
import Textarea from './Textarea'
import Button from './Button'

import * as photoActions from '../redux/actions/photos'

import './UploadPhoto.scss'

const MAX_IMAGE_SIZE = 30000 // 30KB
const MAX_IMAGE_SIZE_MB = 0.03 // 30KB

class UploadPhoto extends Component {
  state = {
    file: '',
    fileName: '',
    location: '',
    caption: '',
    warningMessage: '',
    isCompressing: false,
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleFileChange = (e) => {
    const file = e.target.files[0]
        
    if (file.size > MAX_IMAGE_SIZE) {
      this.setState({
        isCompressing: true,
      })
      return this.compressImage(file)
    }

    return this.setState({
      file,
      fileName: file.name,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { file, fileName, location, caption } = this.state
    this.props.uploadPhoto(file, fileName, location, caption)
    ui.hideModal()
  }

  compressImage = async (imageFile) => {
    try {
      const compressedFile = await imageCompression(imageFile, MAX_IMAGE_SIZE_MB)
      this.setState({
        isCompressing: false,
        file: compressedFile,
        fileName: compressedFile.name,
      })
    } catch (error) {
      this.setState({
        isCompressing: false,
        warningMessage: '* Fail to compress image'
      })
    }
  }

  render() {
    const { fileName, title, isCompressing, warningMessage } = this.state
    return (
      <form className="UploadPhoto" onSubmit={this.handleSubmit}>
        <input
          className="UploadPhoto__file"
          id="upload"
          type="file"
          name="file"
          label="Search file"          
          onChange={this.handleFileChange}
          err={warningMessage}
          accept=".png, .jpg, .jpeg"
          required
        />        
        <Textarea
          className="UploadPhoto__caption"
          name="title"
          value={title}
          label="Title"
          onChange={this.handleInputChange}
          placeholder="Your todo"
          required
        />
        <Button
          className="UploadPhoto__upload"
          type="submit"
          title="Upload"
        />
      </form>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  uploadPhoto: (file, fileName, title) =>
    dispatch(photoActions.uploadPhoto(file, fileName, title)),
})

export default connect(null, mapDispatchToProps)(UploadPhoto)
