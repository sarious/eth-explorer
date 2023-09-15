import { FC, useEffect, useState } from "react";
import { BlockPageProps } from ".";
import { useParams } from "react-router-dom";
import { useAlchemy } from "../../providers/Alchemy.provider";
import { BigNumber, Block } from "alchemy-sdk";

export const BlockPage: FC<BlockPageProps> = (props) => {
  const [blockDetails, setBlockDetails] = useState<Block | null>();

  const { blockNumber = "latest" } = useParams();
  console.log();

  const alchemy = useAlchemy();

  useEffect(() => {
    async function getBlockInfo(blockSearch: string) {
      const blockNumber = parseInt(blockSearch);
      const blockHashOrTag = !isNaN(blockNumber) ? blockNumber : blockSearch;
      const block = await alchemy?.core.getBlock(blockHashOrTag);
      if (!block) return;

      console.log(block);
      setBlockDetails(block);
    }

    console.log(blockNumber);
    getBlockInfo(blockNumber);
  }, [alchemy?.core, blockNumber]);

  if (!blockDetails) {
    <>No details for block.</>;
  }

  return (
    <>
      {blockDetails && (
        <div {...props}>
          <div>
            <span>Transaction Hash: </span>
            <span>{blockDetails?.hash}</span>
          </div>
          <div>
            <span>Hash of Parent Block: </span>
            <span>{blockDetails?.parentHash}</span>
          </div>
          <div>
            <span>Block Number: </span>
            <span>{blockDetails?.number}</span>
          </div>
          <div>
            <span>Timestamp: </span>
            <span>{blockDetails?.timestamp}</span>
          </div>
          <div>
            <span>Nonce: </span>
            <span>{blockDetails?.nonce}</span>
          </div>
          <div>
            <span>Transactions: </span>
            <span>{blockDetails?.transactions.length} transactions</span>
          </div>
          <div>
            <span>Difficulty: </span>
            <span>{blockDetails?.difficulty}</span>
          </div>
          <div>
            <span>Gas Limit: </span>
            <span>{convertWei(blockDetails?.gasLimit)}</span>
          </div>
          <div>
            <span>Gas Used: </span>
            <span>{convertWei(blockDetails?.gasUsed)}</span>
          </div>
          <div>
            <span>Base Fee Per Gas: </span>
            <span>{convertWei(blockDetails?.baseFeePerGas)} wei</span>
          </div>
          <div>
            <span>Miner Address: </span>
            <span>{blockDetails?.miner}</span>
          </div>
          <div>
            <span>Extra Data: </span>
            <span>{blockDetails?.extraData}</span>
          </div>
        </div>
      )}
    </>
  );
};

function convertWei(value: BigNumber | null | undefined) {
  if (value === null || value === undefined) return null;

  return value.toNumber();
}
