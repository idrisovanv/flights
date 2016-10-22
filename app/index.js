import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import configureStore from './store/configureStore';
import FilterableTable from './containers/FilterableTable';

const store = configureStore();

render(
    <AppContainer>
        <Provider store={store}>
            <FilterableTable/>
        </Provider>
    </AppContainer>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept('./containers/FilterableTable', () => {
        const NewTable = require('./containers/FilterableTable').default;
        render(
            <AppContainer>
                <Provider store={store}>
                    <NewTable/>
                </Provider>
            </AppContainer>,
            document.getElementById('root')
        );
    });
}
