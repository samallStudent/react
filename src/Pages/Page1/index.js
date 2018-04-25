import React, {Component} from 'react';
import S from './index.less';
import {Button} from 'antd';
export default class Page1 extends Component {
    render() {
        return (
            <div className={S["page-box"]}>
                <Button type="primary">123</Button>
                <img src={require('./logo.png')}/>
                this is Page1~
            </div>
        )
    }
}
