import { FC, MouseEventHandler, useCallback, useEffect, useMemo, useState } from "react";
import { Button, Container, Heading, HStack, Text, VStack, Image } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Metaplex, walletAdapterIdentity, CandyMachine } from "@metaplex-foundation/js";
import { PublicKey } from "@solana/web3.js";
import { useRouter } from "next/router";

const Connected: FC = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [candyMachine, setCandyMachine] = useState<CandyMachine>();

  const metaplex = useMemo(() => {
    return Metaplex.make(connection).use(walletAdapterIdentity(wallet));
  }, [connection, wallet]);

  useEffect(() => {
    metaplex
      .candyMachines()
      .findByAddress({ address: new PublicKey("BFp2iF6poCEUZFXoAqGxYHVEmrx1rd6S5TxTnUnMyzzf") })
      .run()
      .then((candyMachine) => {
        console.log(candyMachine);
        setCandyMachine(candyMachine);
      })
      .catch((err) => {
        alert(err);
      });
  }, [metaplex]);

  const router = useRouter();

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    async (event) => {
      if (event.defaultPrevented) return;
      if (!wallet.connected || !candyMachine) return;

      try {
        const nft = await metaplex.candyMachines().mint({ candyMachine }).run();
        console.log(nft);
        router.push(`/newMint?mint=${nft.nft.address.toBase58()}`);
      } catch (err) {
        alert(err);
      }
    },
    [metaplex, candyMachine]
  );

  return (
    <VStack spacing={20}>
      <Container>
        <VStack spacing={8}>
          <Heading color="white" as="h1" size="2xl" noOfLines={1} textAlign="center">
            Welcome Buildoor.
          </Heading>
          <Text color="bodyText" fontSize="xl" textAlign="center">
            Each buildoor is randomly generated and can be staked to receive <Text as="b"> $BLD</Text> Use your
            <Text as="b"> $BLD</Text> to upgrade your buildoor and receive perks within the community!
          </Text>
        </VStack>
      </Container>
      <HStack spacing={10}>
        <Image src="avatar1.png" alt="" />
        <Image src="avatar2.png" alt="" />
        <Image src="avatar3.png" alt="" />
        <Image src="avatar4.png" alt="" />
        <Image src="avatar5.png" alt="" />
      </HStack>

      <Button bgColor="accent" color="white" maxW="300px" onClick={handleClick}>
        <HStack>
          <Text>Mint buildoor</Text>
          <ArrowForwardIcon />
        </HStack>
      </Button>
    </VStack>
  );
};

export default Connected;
