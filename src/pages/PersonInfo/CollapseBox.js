import React, { PureComponent } from 'react';
import { List, Avatar } from 'antd';
// import styles from './PersonInfo.less';

// const IconText = ({ type, texts }) => (
//   <span>
//     <Icon type={type} style={{ marginRight: 8 }} />
//     {texts}
//   </span>
// );

class CollapseBox extends PureComponent {
  render() {
    const { data } = this.props;
    return (
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={data}
        renderItem={item => (
          <List.Item key={item.title}>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={item.title}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
    );
  }
}

export default CollapseBox;

// actions={[<IconText type="star-o" text="156" />,
// <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
