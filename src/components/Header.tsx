import React from 'react'
import { Select, Message, Button, Space } from '@arco-design/web-react';


interface Props {
  title: string
}


const Option = Select.Option;
const options = ['中文', 'English'];

const Header: React.FC<Props> = ({ title }) => {
  return (
    <header className="flex items-center w-full justify-center fixed text-xl z-10">
      <div className="max-w-6xl w-full flex justify-between p-6">
        <div  className="flex items-center" style={{color: 'white'}}>
          克莱克特
        </div>

        <div>
          <Button type='text'>动态</Button>
          <Button type='text'>关于我们</Button>
          <Button type='text'>加入我们</Button>
          <Select
            placeholder='语言/lang'
            defaultValue='中文'
            style={{ width: 75, background: 'transparent' }}
            onChange={(value) =>
              Message.info({
                content: `You select ${value}.`,
                showIcon: true,
              })
            }
          >
            {options.map((option, index) => (
              <Option key={option} disabled={index === 3} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </div>
      </div>
    </header>
  );
};

export default Header
