import React, { Component } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import ui from '../utils/ui'
import Button from './Button'

import './Toast.scss'

class Toast extends Component {
  render() {
    const { toast } = this.props
    return toast && (
      <div
        className="Toast"
        key={new Date().getTime()}
      >
        <div
          className={cx('Toast__status', {
            'Toast__status--pending': toast.status === 'pending',
            'Toast__status--success': toast.status === 'success',
            'Toast__status--fail': toast.status === 'fail',
            'Toast__status--error': toast.status === 'error',
          })}
        >
          {toast.status}
        </div>
        <p className="Toast__message">{toast.message}</p>
        {
          toast.txHash &&
          <div className="Toast__txHash">
            {toast.txHash}
          </div>
        }        
        <Button
          className="Toast__close"          
          alt="close toast"
          title="close"
          onClick={ui.hideToast}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  toast: state.ui.toast,
})

export default connect(mapStateToProps)(Toast)
