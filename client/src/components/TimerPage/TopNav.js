import { Center, Flex, Text, Box, Input } from "@chakra-ui/react";
import axios from "axios";
import React, { useRef, useState } from "react";
import {
  BsFolderFill,
  BsFillTagFill,
  BsCurrencyDollar,
  BsArrowRight,
} from "react-icons/bs";
import { GrAddCircle } from "react-icons/gr";
import { AiFillPlayCircle } from "react-icons/ai";
import { formatAMPM } from "./Time";
import Googlestop from "./GoogleStop";
import SubNav from "./SubNav";
import Scheduler from "./Scheduler";
import { msToTime, postdata } from "./api";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetTIMERApi, PostTIMER } from "../../store/timer/timer.action";
// import { Text } from '@chakra-ui/react';

const TopNav = () => {
  const [watch, setWatch] = useState(0);
  const [text, setText] = useState("");
  const [send, setSend] = useState({});
  const id = useRef(null);
const dispatch = useDispatch()
const {data} = useSelector(state=>state.timer)

  // console.log(data);
  const start = () => {
    if (!id.current) {
      id.current = setInterval(() => {
        setWatch((el) => el + 10);
      }, 10);
    }
  };

  useEffect(()=>{
  dispatch(GetTIMERApi())
  },[])

  const stop = () => {
    dispatch(
      PostTIMER({ id: Date.now(), project: text, stopat: msToTime(watch) })
    ).then(()=>dispatch(GetTIMERApi()))
    clearInterval(id.current);
    id.current = null;
    setSend();
    setText("");
  };

  let project = true;
  let [timer, setTimer] = useState(false);
  return (
    <div>
      <Flex
        position="sticky"
        h="90px"
        boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px;"
        p="10px 2px 10px 10px"
        bg="white"
      >
        <Center w="20%">
          <Input
            placeholder="What have you done ?"
            border="none"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Center>
        <Center w="23%"></Center>
        <Center flex="1">
          <Flex gap="3%" alignItems="center" justifyContent="center">
            {project ? (
              <BsFolderFill color="#7e6e85" size="8%" />
            ) : (
              <Text fontSize="md" color="black">
                + Create a project
              </Text>
            )}

            <BsFillTagFill color="#7e6e85" size="8%" />
            <BsCurrencyDollar color="#7e6e85" size="8%" />
            {timer ? (
              <Box>
                <Googlestop watch={watch} />
              </Box>
            ) : (
              <>
                <Box
                  as="div"
                  w="60%"
                  border="1px"
                  borderColor="black"
                  borderRadius="20px"
                  pl="7%"
                >
                  <Text color="black">{`${formatAMPM(
                    new Date()
                  )}     Today`}</Text>
                </Box>
                <BsArrowRight color="#7e6e85" size="40px" />
                <Box
                  as="div"
                  w="40%"
                  border="1px"
                  borderColor="black"
                  borderRadius="20px"
                  pl="5%"
                >
                  <Text color="black">{formatAMPM(new Date())}</Text>
                </Box>
              </>
            )}
            {timer ? (
              <AiFillPlayCircle
                color="black"
                size="40px"
                cursor="pointer"
                onClick={!watch ? start : stop}
              />
            ) : (
              <GrAddCircle size="80px" color="#7e6e85" cursor="pointer" />
            )}

            <Flex direction="column">
              <Box as="div" color="black">
                <AiFillPlayCircle
                  size="20px"
                  cursor="pointer"
                  onClick={() => setTimer(true)}
                />
              </Box>
              <Box as="div" color="black">
                <GrAddCircle
                  size="20px"
                  color="#7e6e85"
                  cursor="pointer"
                  onClick={() => setTimer(false)}
                />
              </Box>
            </Flex>
          </Flex>
        </Center>
      </Flex>
      <SubNav />
      <Scheduler 
      // getdata={getdata}
       data={data} />
    </div>
  );
};

export default TopNav;
