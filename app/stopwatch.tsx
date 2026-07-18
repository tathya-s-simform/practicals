import React, { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function convertTime(time: TimeType) {
  let convertedTime = time;
  if (Number(time.miliSeconds) >= 99) {
    convertedTime = {
      ...convertedTime,
      seconds: (Number(convertedTime.seconds) + 1).toString().padStart(2, "0"),
      miliSeconds: "00",
    };
  }
  if (Number(time.seconds) >= 60) {
    convertedTime = {
      ...convertedTime,
      minutes: (Number(convertedTime.minutes) + 1).toString().padStart(2, "0"),
      seconds: "00",
      miliSeconds: "00",
    };
  }
  if (Number(time.minutes) >= 60) {
    convertedTime = {
      hours: (Number(convertedTime.hours) + 1).toString().padStart(2, "0"),
      minutes: "00",
      seconds: "00",
      miliSeconds: "00",
    };
  }
  return convertedTime;
}
export const showTime = (time: TimeType) => {
  return `${time.hours}:${time.minutes}:${time.seconds}:${time.miliSeconds}`;
};
export type TimeType = {
  hours: string;
  minutes: string;
  seconds: string;
  miliSeconds: string;
};
export const initialTime: TimeType = {
  hours: "00",
  minutes: "00",
  seconds: "00",
  miliSeconds: "00",
};
const Stopwatch = () => {
  const [time, setTime] = useState<TimeType>(initialTime);
  const [isStarted, setIsStarted] = useState(false);
  const [lapTime, setLapTime] = useState<TimeType[]>([]);
  const [isInitial, setIsInitial] = useState(true);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const handleToggle = () => {
    setIsStarted((prev) => !prev);
    if (!isStarted) {
      handleStart();
    } else {
      handleStop();
    }
  };
  const handleStart = () => {
    setIsInitial(false);
    timer.current = setInterval(
      () =>
        setTime((prev) =>
          convertTime({
            ...prev,
            miliSeconds: (Number(prev.miliSeconds) + 1)
              .toString()
              .padStart(2, "0"),
          })
        ),
      1
    );
  };
  const handleStop = () => {
    if (timer.current) {
      clearInterval(timer.current);
    }
  };
  const handleReset = () => {
    if (timer.current) {
      clearInterval(timer.current);
    }
    setTime(initialTime);
    setIsStarted(false);
    setIsInitial(true);
    setLapTime([]);
  };
  const handleLap = (time: TimeType) => {
    isStarted && setLapTime((prev) => [...prev, time]);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.stopwatch}>STOPWATCH</Text>
      <Text style={styles.time}>{showTime(time)}</Text>
      <View style={styles.buttonGroup}>
        <Pressable
          style={[styles.button, isStarted && styles.stop]}
          onPress={handleToggle}
        >
          <Text style={[styles.buttonText]}>
            {isStarted ? "STOP" : "START"}
          </Text>
        </Pressable>
        <Pressable
          disabled={!isStarted}
          style={[styles.button, !isStarted && styles.disabled]}
          onPress={() => handleLap(time)}
        >
          <Text style={[styles.buttonText]}>LAP</Text>
        </Pressable>
        <Pressable
          style={[styles.button, isInitial && styles.disabled]}
          onPress={handleReset}
          disabled={isInitial}
        >
          <Text style={[styles.buttonText]}>RESET</Text>
        </Pressable>
      </View>
      {lapTime.length > 0 && (
        <View style={styles.lap}>
          <Text style={styles.lapTimes}>Lap Times</Text>
          {lapTime.map((time, index) => (
            <View key={index}>
              <Text style={styles.lapTime}>
                {index + 1}. {showTime(time)}
              </Text>
              <View style={styles.divider}></View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default Stopwatch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  button: {
    flex: 1,
    alignItems: "center",
    padding: 14,
    backgroundColor: "blue",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    marginBottom: 14,
  },
  stopwatch: {
    fontSize: 24,
    alignSelf: "center",
    fontWeight: "semibold",
  },
  time: {
    fontSize: 50,
    alignSelf: "center",
    fontWeight: "bold",
    marginVertical: 20,
  },
  lap: {
    backgroundColor: "white",
    flex: 1,
    marginVertical: 10,
    borderRadius: 20,
    shadowColor: "grey",
    shadowOpacity: 20,
    shadowRadius: 8,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    padding: 20,
  },
  lapTimes: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  divider: {
    marginTop: 10,
    marginHorizontal: 10,
    flex: 1,
    borderWidth: 1,
    borderColor: "grey",
  },
  lapTime: {
    fontSize: 20,
    paddingTop: 10,
    paddingLeft: 10,
  },
  disabled: {
    backgroundColor: "grey",
  },
  stop: {
    backgroundColor: "red",
  },
});
