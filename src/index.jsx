import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, hashHistory } from 'react-router';
import  Search from './components/search/search';
import  Category from './components/search/category';
import  LittleCategory from './components/search/littleCategory';
import  ResultList from './components/searchResult/resultList';
import  DetailList from './components/searchResult/detailList'
import  Detail from './components/searchResult/detail'
import  Login from './components/login/login.jsx'
import  RegistePhone from './components/login/registePhone'
import  RegisteOther from './components/login/registeOther'
import  FogetPasswordPhone from './components/login/fogetPasswordPhone'
import  FogetPasswordOther from './components/login/fogetPasswordOther'
import  History_Search from './components/searchHistory/history_Search'
import  History_SearchBigCategory_List from './components/searchHistory/history_SearchBigCategory_List'
import  History_SearchLittleCategory_List  from './components/searchHistory/history_SearchLittleCategory_List'
import  History_searchResult_inOneLittleCategory  from './components/searchHistory/history_searchResult_inOneLittleCategory'
import  History_Search_Detail from './components/searchHistory/history_Search_Detail'





const router = (
        <Router history={hashHistory}>
            <Route path="/login" component={Login}/>
            <Route path="/" component={Search}/>
            <Route path="category" component={Category} />
            <Route path="littleCategory" component={LittleCategory} />
            <Route path="resultList" component={ResultList}/>
            <Route path="detailList" component={DetailList}/>
            <Route path="detail" component={Detail}/>
            <Route path="/registePhone" component={RegistePhone}/>
            <Route path="/registeOther" component={RegisteOther}/>
            <Route path="/fogetPasswordPhone" component={FogetPasswordPhone}/>
            <Route path="/fogetPasswordOther" component={FogetPasswordOther}/>
            <Route path="/history_Search" component={History_Search}/>
            <Route path="/history_SearchBigCategory_List" component={History_SearchBigCategory_List}/>
            <Route path="/history_SearchLittleCategory_List" component={History_SearchLittleCategory_List}/>
            <Route path="/history_searchResult_inOneLittleCategory" component={History_searchResult_inOneLittleCategory}/>
            <Route path="/history_Search_Detail" component={History_Search_Detail}/>

        </Router>


);

ReactDOM.render(
    router,document.getElementById('root')
);

