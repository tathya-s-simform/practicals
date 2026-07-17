import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

const Day5 = () => {
  const INITIAL_DATA = new Array(6).fill("");
  const [otp, setOtp] = useState<string[]>(INITIAL_DATA);
  const [time, setTime] = useState(30);
  const [started, setStarted] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const inputRef = useRef<(TextInput | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const otpRegex = /^[0-9]$/;

  useEffect(() => {
    if (!started) return;
    timerRef.current = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          timerRef.current = null;
          setStarted(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timerRef.current!);
      timerRef.current = null;
    };
  }, [started]);

  const startTimer = () => {
    if (started) return;
    setTime(30);
    setStarted(true);
  };

  const handleChange = (text: string, index: number) => {
    if (text && !otpRegex.test(text)) {
      Alert.alert("Enter Valid Number");
      return;
    }
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (newOtp.join("").length === 6) {
      setIsValid(true);
    }
    if (text && index < inputRef.current.length - 1) {
      inputRef.current[index + 1]?.focus();
    }
  };

  const handleBackPress = (key: string, index: number) => {
    if (key === "Backspace" && otp[index] === "" && index > 0) {
      inputRef.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.enter}>ENTER OTP</Text>

      <View style={styles.otpContainer}>
        {INITIAL_DATA.map((_, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              inputRef.current[index] = ref;
            }}
            maxLength={1}
            keyboardType="numeric"
            style={styles.box}
            value={otp[index]}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={({ nativeEvent }) =>
              handleBackPress(nativeEvent.key, index)
            }
          />
        ))}
      </View>

      <Text style={{ fontSize: 20, alignSelf: "center", marginBottom: 20 }}>
        {time}
      </Text>

      <Button
        title={started ? "Resend in progress..." : "Send OTP"}
        disabled={started || !isValid}
        onPress={startTimer}
      />
    </View>
  );
};

export default Day5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  enter: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
  },
  otpContainer: {
    margin: 20,
    flexDirection: "row",
    gap: 14,
  },
  box: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 4,
    textAlign: "center",
    fontSize: 20,
  },
});
