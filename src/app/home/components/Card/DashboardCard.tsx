/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Title } from '@patternfly/react-core';
import theme from '../../../../theme';
import Loader from 'react-loader-spinner';
import CardStatus from './Status/CardStatus';
import MigrationStatus from './Status/MigrationStatus';
import FooterText from './FooterText';
import HeaderText from './HeaderText';
import { css } from '@emotion/core';
import { Flex, Box, Text } from '@rebass/emotion';
interface IState {
  isOpen: boolean;
}
interface IProps {
  title: string;
  dataList: any[];
  isFetching?: boolean;
  type?: string;
}

class DashboardCard extends Component<IProps, IState> {
  state = {
    isOpen: false,
  };

  onToggle = isOpen => {
    this.setState({
      isOpen,
    });
  };

  onSelect = event => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };
  render() {
    const { dataList, title, isFetching, type } = this.props;
    const { isOpen } = this.state;
    return (
      <Card style={{ minHeight: '100%', height: '16em' }}>
        {dataList && !isFetching ? (
          <React.Fragment>
            <CardHeader>
              <Title size="md">
                <HeaderText type={type} dataList={dataList} />
              </Title>
            </CardHeader>
            <CardBody>
              {type === 'plans' ? (
                <MigrationStatus dataList={dataList} />
              ) : (
                <CardStatus dataList={dataList} type={type} />
              )}
            </CardBody>
            <CardFooter>
              <FooterText dataList={dataList} type={type} />
            </CardFooter>
          </React.Fragment>
        ) : (
          <Flex
            css={css`
              height: 100%;
              text-align: center;
              margin: auto;
            `}
          >
            <Box flex="1" m="auto">
              <Loader type="ThreeDots" color={theme.colors.navy} height="100" width="100" />
              <Text fontSize={[2, 3, 4]}> Loading </Text>
            </Box>
          </Flex>
        )}
      </Card>
    );
  }
}

export default DashboardCard;
