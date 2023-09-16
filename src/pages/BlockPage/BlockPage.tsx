import { FC, useEffect, useState } from "react";
import { BlockPageProps } from ".";
import { useParams } from "react-router-dom";
import { useAlchemy } from "../../providers/Alchemy.provider";
import { BigNumber, Block } from "alchemy-sdk";
import { Button, Card, Col, Divider, Empty, Row, Space } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons/lib/icons";

export const BlockPage: FC<BlockPageProps> = (props) => {
  const [blockDetails, setBlockDetails] = useState<Block | null>(null);

  const { blockNumber = "latest" } = useParams();
  console.log();

  const alchemy = useAlchemy();

  useEffect(() => {
    async function getBlockInfo(blockSearch: string) {
      const hash = blockSearch.toLowerCase().startsWith("0x");
      const blockNumber = parseInt(blockSearch);
      const blockHashOrTag =
        !isNaN(blockNumber) && !hash ? blockNumber : blockSearch;
      const block = await alchemy?.core.getBlock(blockHashOrTag);
      console.log(block);
      if (!block) return;

      console.log(block);
      setBlockDetails(block);
    }

    console.log(blockNumber);
    getBlockInfo(blockNumber);
  }, [alchemy?.core, blockNumber]);

  if (!blockDetails) {
    return <Empty>No details for block.</Empty>;
  }

  return (
    <>
      {blockDetails && (
        <>
          <Space size="middle">
            <Card
              title={`Block #${blockDetails.number}`}
              extra={
                <>
                  <Button
                    type="primary"
                    icon={<LeftOutlined />}
                    size="middle"
                  />
                  <Button
                    type="primary"
                    icon={<RightOutlined />}
                    size="middle"
                  />
                </>
              }
            >
              <Row gutter={[24, 16]}>
                <Col span={6}>Transaction Hash: </Col>
                <Col span={18}>{blockDetails?.hash}</Col>

                <Col span={6}>Hash of Parent Block: </Col>
                <Col span={18}>{blockDetails?.parentHash}</Col>

                <Col span={6}>Block Number: </Col>
                <Col span={18}>{blockDetails?.number}</Col>

                <Col span={6}>Timestamp: </Col>
                <Col span={18}>{blockDetails?.timestamp}</Col>

                <Col span={6}>Nonce: </Col>
                <Col span={18}>{blockDetails?.nonce}</Col>

                <Col span={6}>Transactions: </Col>
                <Col span={18}>
                  {blockDetails?.transactions.length} transactions
                </Col>

                <Divider />

                <Col span={6}>Difficulty: </Col>
                <Col span={18}>{blockDetails?.difficulty}</Col>

                <Col span={6}>Gas Limit: </Col>
                <Col span={18}>{convertWei(blockDetails?.gasLimit)}</Col>

                <Col span={6}>Gas Used: </Col>
                <Col span={18}>{convertWei(blockDetails?.gasUsed)}</Col>

                <Col span={6}>Base Fee Per Gas: </Col>
                <Col span={18}>
                  {convertWei(blockDetails?.baseFeePerGas)} wei
                </Col>

                <Col span={6}>Miner Address: </Col>
                <Col span={18}>{blockDetails?.miner}</Col>

                <Col span={6}>Extra Data: </Col>
                <Col span={18}>{blockDetails?.extraData}</Col>
              </Row>
            </Card>
          </Space>
          <div {...props}></div>
        </>
      )}
    </>
  );
};

function convertWei(value: BigNumber | null | undefined) {
  if (value === null || value === undefined) return null;

  return value.toNumber();
}
