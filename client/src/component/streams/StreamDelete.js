import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {fetchStream, deleteStream} from '../../actions';
import {Link} from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  renderActions() {
    const {id} = this.props.match.params;
    const {deleteStream} = this.props;
    return (
      <Fragment>
        <button onClick={() => deleteStream(id)} className="ui button negative">
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </Fragment>
    );
  }

  renderContent() {
    if (!this.props.stream) {
      return 'Are you sure you want delete this stream ?';
    }
    return `Are you sure you want to delete the stream wit title: ${
      this.props.stream.title
    }`;
  }

  render() {
    return (
      <Modal
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {stream: state.streams[ownProps.match.params.id]};
};

export default connect(
  mapStateToProps,
  {
    fetchStream,
    deleteStream,
  }
)(StreamDelete);
