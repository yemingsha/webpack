/* eslint no-dupe-keys: 0 */
import {NavBar, ListView } from 'antd-mobile';
import './detailList.less'

const data = [
    {
        img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
        title: '相约酒店',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
        title: '麦当劳邀您过周末',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
        title: '食惠周',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
];
let index = data.length - 1;

const NUM_ROWS = 20;
let pageIndex = 0;

export default class DetailList extends React.Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.genData = (pIndex = 0) => {
            const dataBlob = {};
            for (let i = 0; i < NUM_ROWS; i++) {
                const ii = (pIndex * NUM_ROWS) + i;
                dataBlob[`${ii}`] = `row - ${ii}`;
            }
            return dataBlob;
        };

        this.state = {
            dataSource: dataSource.cloneWithRows({}),
            isLoading: true,
        };
    }

    componentDidMount() {
        // you can scroll to the specified position
        // this.refs.lv.refs.listview.scrollTo(0, 200);

        // simulate initial Ajax
        setTimeout(() => {
            this.rData = this.genData();
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            });
        }, 600);
    }

    // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
    // componentWillReceiveProps(nextProps) {
    //   if (nextProps.dataSource !== this.props.dataSource) {
    //     this.setState({
    //       dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
    //     });
    //   }
    // }

    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        console.log('reach end', event);
        this.setState({ isLoading: true });
        setTimeout(() => {
            this.rData = { ...this.rData, ...this.genData(++pageIndex) };
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            });
        }, 1000);
    }



    jumpBack(){

        window.location.hash="/resultList";
    }

    clickRow(){
        window.location.hash="/detail";

    }
    render() {
        const separator = (sectionID, rowID) => (
            <div key={`${sectionID}-${rowID}`} style={{
        backgroundColor: '#F5F5F9',
        height: 8,
        borderTop: '1px solid #ECECED',
        borderBottom: '1px solid #ECECED',
      }}
            />
        );
        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = data.length - 1;
            }
            const obj = data[index--];
            return (

                <div key={rowID} className="row" onClick={()=>this.clickRow()}
                >
                    <div className="row-title">{obj.title}</div>
                    <div style={{ display: '-webkit-box', display: 'flex', padding: '0.3rem 0' }}>
                        <img style={{ height: '1.28rem', marginRight: '0.3rem' }} src={obj.img} />
                        <div className="row-text">
                            <div style={{ marginBottom: '0.16rem', fontWeight: 'bold' }}>{obj.des}</div>
                            <div><span style={{ fontSize: '0.6rem', color: '#FF6E27' }}>{rowID}</span>元/任务</div>
                        </div>
                    </div>
                </div>
            );
        };
        return (
            <div>
                <NavBar leftContent="返回" mode="dark" onLeftClick={this.jumpBack}
                ></NavBar>
            <ListView ref="lv"
                      dataSource={this.state.dataSource}
                      renderHeader={() => <span>共100条信息</span>}
                      renderFooter={() => <div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.isLoading ? '加载中...' : '加载完毕'}
        </div>}
                      renderRow={row}
                      renderSeparator={separator}
                      className="am-list"
                      pageSize={4}
                      scrollRenderAheadDistance={500}
                      scrollEventThrottle={20}
                      onScroll={() => { console.log('scroll'); }}
                      useBodyScroll
                      onEndReached={this.onEndReached}
                      onEndReachedThreshold={10}
            />
            </div>
        );
    }
}
