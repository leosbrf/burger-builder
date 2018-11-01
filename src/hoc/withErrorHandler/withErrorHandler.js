import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';

//todo: rename to WithRequestInterceptor
const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        constructor(props) {
            super(props);

            this.reqInterceptor = axios.interceptors.request.use((req) => {
                this.setState({ error: null });
                //todo: include authentication token on every call
                return req;
            })
            this.resInterceptor = axios.interceptors.response.use(res => res, (error) => {
                this.setState({ error: error });
            })
        }

        state = {
            error: null
        }

        //Deprecated (will be renamed to UNSAFE_componentWillMount)
        // componentWillMount() {
        //     this.reqInterceptor = axios.interceptors.request.use((req) => {
        //         this.setState({ error: null });
        //         return req;
        //     })
        //     this.resInterceptor = axios.interceptors.response.use(res => res, (error) => {
        //         this.setState({ error: error });
        //     })
        // }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null })
        }

        render() {
            return (
                <React.Fragment>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </React.Fragment>
            )
        }
    }
}

export default withErrorHandler;