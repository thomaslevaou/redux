import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Survey from './pages/Survey'
import Results from './pages/Results'
import Freelances from './pages/Freelances'
import Profile from './pages/Profile'
import Header from './components/Header'
import Footer from './components/Footer'
import Error from './components/Error'
import GlobalStyle from './utils/style/GlobalStyle'
import { Provider } from 'react-redux'
import store from './utils/store'
import { QueryClient, QueryClientProvider } from 'react-query'

// le queryClient va contenir les données de l'application utilisées par react-query
const queryClient = new QueryClient()

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <React.StrictMode>
        <Router>
          <GlobalStyle />
          <Header />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/survey/:questionNumber">
              <Survey />
            </Route>
            <Route path="/results">
              <Results />
            </Route>
            <Route path="/freelances">
              <Freelances />
            </Route>
            <Route
              path="/profile/:id"
              render={(props) => <Profile {...props} />}
            />
            <Route path="*">
              <Error />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </React.StrictMode>
    </Provider>
  </QueryClientProvider>,
  document.getElementById('root')
)
