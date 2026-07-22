import CustomButton from "@/src/components/customButton/customButton";
import ScoreButton from "@/src/components/scoreButton/scoreButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export type TotalOvers = 20 | 50;
export type AllowedValues =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "6"
  | "Wd"
  | "Nb"
  | "Wk"
  | "b"
  | "lb"
  | "";
export type Data = AllowedValues[];
export type WinnerType = "You" | "Opponent" | "Tie" | null;

const CricketScore = () => {
  const [overs, setOvers] = useState<TotalOvers>(20);
  const [isChasing, setIsChasing] = useState(true);
  const [settingsConfigured, setSettingsConfigured] = useState(false);
  const [target, setTarget] = useState(200);
  const [ballsData, setBallsData] = useState<Data[] | null>(null);
  const [currentWicket, setCurrentWicket] = useState(0);
  const [currentOverNumber, setCurrentOverNumber] = useState(0);
  const [currentOverData, setCurrentOverData] = useState<Data>([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<WinnerType>(null);

  const numberRuns = ["0", "1", "2", "3", "4", "6"];
  const validateResult = useCallback((): WinnerType => {
    let result: WinnerType = null;
    if (currentScore >= target && currentOverNumber <= overs) {
      result = "You";
      setGameOver(true);
    } else if (currentWicket === 10 && currentScore < target - 1) {
      result = "Opponent";
      setGameOver(true);
    } else if (
      currentOverNumber === overs &&
      currentOverData.length === 6 &&
      currentScore < target - 1
    ) {
      result = "Opponent";
      setGameOver(true);
    } else if (currentWicket === 10 && currentScore === target - 1) {
      result = "Tie";
      setGameOver(true);
    } else if (
      currentOverNumber === overs &&
      currentOverData.length === 6 &&
      currentScore === target - 1
    ) {
      result = "Tie";
      setGameOver(true);
    }
    setWinner(result);
    return result;
  }, [
    currentOverData.length,
    currentOverNumber,
    currentScore,
    currentWicket,
    overs,
    target,
  ]);
  useEffect(() => {
    const result = validateResult();
    console.log(result);
  }, [
    currentScore,
    currentWicket,
    currentOverNumber,
    currentOverData,
    validateResult,
  ]);

  const handleConfirmPress = () => {
    setSettingsConfigured((prev) => !prev);
  };

  const updateScore = (value: AllowedValues) => {
    if (gameOver) {
      return;
    }
    if (value === "Wk") {
      setCurrentWicket((prev) => prev + 1);
    } else if (numberRuns.includes(value)) {
      setCurrentScore((prev) => prev + Number(value));
    } else if (value === "Wd" || value === "Nb") {
      setCurrentScore((prev) => prev + 1);
    }
    setCurrentOverData((prev) => {
      if (prev.length === 5) {
        setBallsData((previous) =>
          previous ? [...previous, [...prev, value]] : [[...prev, value]]
        );
        setCurrentOverNumber((p) => p + 1);
        setCurrentOverData([]);
        return [];
      }
      return [...prev, value];
    });
  };

  const calculateRemainingRuns = () => {
    if (gameOver) {
      return;
    }
    return target - currentScore;
  };

  const calculateTotalBalls = () => {
    if (gameOver) {
      return;
    }
    return currentOverNumber * 6 + currentOverData.length;
  };

  const calculateRemainingBalls = () => {
    if (gameOver) {
      return;
    }
    return overs * 6 - (calculateTotalBalls() ?? 0);
  };
  const calculateCurrentOverRuns = () => {
    if (gameOver) {
      return;
    }
    let currentOverRuns = 0;
    for (let value of currentOverData) {
      if (numberRuns.includes(value)) {
        currentOverRuns += Number(value);
      } else if (value === "Wd" || value === "Nb") {
        currentOverRuns += 1;
      }
    }
    return currentOverRuns;
  };

  const calculateRunRate = () => {
    if (gameOver) {
      return;
    }
    const totalOversPlayed = currentOverNumber + currentOverData.length / 6;
    if (totalOversPlayed === 0) return 0;
    return currentScore / totalOversPlayed;
  };

  const calculateRequiredRunRate = () => {
    if (gameOver) {
      return;
    }
    const remBalls = calculateRemainingBalls();
    if (!remBalls || remBalls <= 0) return 0;
    return (calculateRemainingRuns() ?? 0) / (remBalls / 6);
  };

  const getRunBadgeStyle = (val: AllowedValues) => {
    if (gameOver) {
      return;
    }
    if (val === "4" || val === "6") return styles.runBadgeBoundary;
    if (val === "Wk") return styles.runBadgeWicket;
    if (val === "Wd" || val === "Nb") return styles.runBadgeExtra;
    return styles.runBadgeNormal;
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.teamContainer}>
          <Text style={styles.teamText}>India XI (You)</Text>
        </View>
        <View style={styles.vsBadge}>
          <Text style={styles.vsText}>VS</Text>
        </View>
        <View style={styles.teamContainer}>
          <Text style={[styles.teamText, styles.textRight]}>Australia XI</Text>
        </View>
      </View>
      {!settingsConfigured ? (
        <ScrollView contentContainerStyle={styles.settingsScroll}>
          <View style={styles.setupCard}>
            <Text style={styles.cardHeaderTitle}>Match Setup</Text>
            <View style={styles.settingGroup}>
              <Text style={styles.label}>Match Format</Text>
              <View style={styles.segment}>
                <Pressable
                  onPress={() => setOvers(20)}
                  style={[
                    styles.segmentButton,
                    overs === 20 && styles.segmentButtonActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.segmentText,
                      overs === 20 && styles.segmentTextActive,
                    ]}
                  >
                    T20 (20 Overs)
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setOvers(50)}
                  style={[
                    styles.segmentButton,
                    overs === 50 && styles.segmentButtonActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.segmentText,
                      overs === 50 && styles.segmentTextActive,
                    ]}
                  >
                    ODI (50 Overs)
                  </Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.settingGroup}>
              <Text style={styles.label}>Innings Choice</Text>
              <View style={styles.segment}>
                <Pressable
                  onPress={() => setIsChasing(false)}
                  style={[
                    styles.segmentButton,
                    !isChasing && styles.segmentButtonActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.segmentText,
                      !isChasing && styles.segmentTextActive,
                    ]}
                  >
                    1st Innings
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setIsChasing(true)}
                  style={[
                    styles.segmentButton,
                    isChasing && styles.segmentButtonActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.segmentText,
                      isChasing && styles.segmentTextActive,
                    ]}
                  >
                    2nd Innings
                  </Text>
                </Pressable>
              </View>
            </View>
            {isChasing && (
              <View style={styles.settingGroup}>
                <Text style={styles.label}>Target Score</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Target Score"
                  placeholderTextColor="#9CA3AF"
                  value={target ? target.toString() : ""}
                  onChangeText={(text) => setTarget(Number(text) || 0)}
                  keyboardType="numeric"
                />
              </View>
            )}
            <View style={styles.summaryBox}>
              <MaterialCommunityIcons
                name="information"
                size={20}
                color="#2563EB"
              />
              <Text style={styles.summaryText}>
                Playing {overs} overs match in{" "}
                {isChasing ? "2nd Innings" : "1st Innings"}.
                {isChasing && ` Target: ${target} runs.`}
              </Text>
            </View>
            <CustomButton
              title="Start Match"
              onPress={handleConfirmPress}
              variant="primary"
              style={styles.confirmBtn}
            />
          </View>
        </ScrollView>
      ) : (
        <View style={styles.scoreContainer}>
          {!gameOver && !winner ? (
            <>
              <View style={styles.mainScoreCard}>
                <View style={styles.scoreMainCol}>
                  <Text style={styles.scoreLabel}>Current Score</Text>
                  <Text style={styles.scoreValue}>
                    {currentScore}
                    <Text style={styles.wicketText}>/{currentWicket}</Text>
                  </Text>
                  <Text style={styles.overSubText}>
                    {currentOverNumber}.{currentOverData.length} / {overs} Overs
                  </Text>
                </View>
                {isChasing && (
                  <>
                    <View style={styles.verticalDivider} />
                    <View style={styles.chaseCol}>
                      <View style={styles.needBadge}>
                        <Text style={styles.needTitle}>Target: {target}</Text>
                        <Text style={styles.needDetailText}>
                          Need{" "}
                          <Text style={styles.boldText}>
                            {calculateRemainingRuns()}
                          </Text>{" "}
                          runs in{" "}
                          <Text style={styles.boldText}>
                            {calculateRemainingBalls()}
                          </Text>{" "}
                          balls
                        </Text>
                      </View>
                    </View>
                  </>
                )}
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.analyticsContainer}
                contentContainerStyle={styles.analyticsContent}
              >
                <View style={styles.infoCard}>
                  <MaterialCommunityIcons
                    name="speedometer"
                    color="#2563EB"
                    size={22}
                  />
                  <Text style={styles.infoTitle}>Run Rate</Text>
                  <Text style={styles.infoValue}>
                    {(calculateRunRate() ?? 0).toFixed(2)}
                  </Text>
                </View>
                {isChasing && (
                  <View style={styles.infoCard}>
                    <MaterialCommunityIcons
                      name="chart-line"
                      color="#D97706"
                      size={22}
                    />
                    <Text style={styles.infoTitle}>Req. RR</Text>
                    <Text style={styles.infoValue}>
                      {(calculateRequiredRunRate() ?? 0).toFixed(2)}
                    </Text>
                  </View>
                )}
                <View style={styles.infoCard}>
                  <MaterialCommunityIcons
                    name="timer-sand"
                    color="#059669"
                    size={22}
                  />
                  <Text style={styles.infoTitle}>Balls Left</Text>
                  <Text style={styles.infoValue}>
                    {calculateRemainingBalls()}
                  </Text>
                </View>
                <View style={styles.infoCard}>
                  <MaterialCommunityIcons
                    name="account-group"
                    color="#DC2626"
                    size={22}
                  />
                  <Text style={styles.infoTitle}>Wickets Left</Text>
                  <Text style={styles.infoValue}>{10 - currentWicket}</Text>
                </View>
              </ScrollView>
              <View style={styles.overRowCard}>
                <View style={styles.overHeader}>
                  <Text style={styles.overHeaderTitle}>
                    Over {currentOverNumber + 1}
                  </Text>
                  <Text style={styles.overRunsSummary}>
                    {calculateCurrentOverRuns()} Runs ({currentOverData.length}{" "}
                    Balls)
                  </Text>
                </View>
                <View style={styles.runRow}>
                  {currentOverData.length === 0 ? (
                    <Text style={styles.emptyOverText}>
                      No balls bowled in this over yet
                    </Text>
                  ) : (
                    currentOverData.map((data, index) => (
                      <View
                        key={index}
                        style={[styles.runStatus, getRunBadgeStyle(data)]}
                      >
                        <Text style={styles.runText}>
                          {data === "0" ? "•" : data}
                        </Text>
                      </View>
                    ))
                  )}
                </View>
              </View>
              <View style={styles.keyboardContainer}>
                <Text style={styles.keyboardTitle}>Record Ball</Text>
                <View style={styles.recordBallGrid}>
                  <ScoreButton label="0" onPress={() => updateScore("0")} />
                  <ScoreButton label="1" onPress={() => updateScore("1")} />
                  <ScoreButton label="2" onPress={() => updateScore("2")} />
                  <ScoreButton label="3" onPress={() => updateScore("3")} />
                  <ScoreButton
                    label="4"
                    onPress={() => updateScore("4")}
                    color="#DCFCE7"
                    textColor="#15803D"
                  />
                  <ScoreButton
                    label="6"
                    onPress={() => updateScore("6")}
                    color="#DCFCE7"
                    textColor="#15803D"
                  />
                  <ScoreButton
                    label="Wd"
                    onPress={() => updateScore("Wd")}
                    color="#FEF3C7"
                    textColor="#B45309"
                  />
                  <ScoreButton
                    label="Nb"
                    onPress={() => updateScore("Nb")}
                    color="#FEF3C7"
                    textColor="#B45309"
                  />
                  <ScoreButton
                    label="B"
                    onPress={() => updateScore("b")}
                    color="#E0F2FE"
                    textColor="#0369A1"
                  />
                  <ScoreButton
                    label="LB"
                    onPress={() => updateScore("lb")}
                    color="#E0F2FE"
                    textColor="#0369A1"
                  />
                  <ScoreButton
                    label="Wk"
                    onPress={() => updateScore("Wk")}
                    color="#FEE2E2"
                    textColor="#B91C1C"
                  />
                </View>
              </View>
              <Pressable
                style={styles.fabSettings}
                onPress={handleConfirmPress}
              >
                <MaterialCommunityIcons name="cog" color="#FFFFFF" size={24} />
              </Pressable>
            </>
          ) : (
            <View style={styles.gameOverContainer}>
              <Text style={styles.gameOverTitle}>Game Over!!!</Text>
              <Text style={styles.winnerText}>
                {winner === "Opponent"
                  ? "Opponent Won!!!"
                  : winner === "You"
                  ? "You Won!!!"
                  : winner === "Tie" && "Match Tied"}
              </Text>
              <MaterialCommunityIcons
                name={
                  winner === "You"
                    ? "trophy"
                    : winner === "Opponent"
                    ? "emoticon-sad"
                    : "handshake"
                }
                size={80}
                color={
                  winner === "You"
                    ? "#22C55E"
                    : winner === "Opponent"
                    ? "#EF4444"
                    : "#F59E0B"
                }
                style={styles.winnerIcon}
              />
              <CustomButton
                title="Play Again"
                onPress={() => {
                  setSettingsConfigured(false);
                  setGameOver(false);
                  setWinner(null);
                  setCurrentScore(0);
                  setCurrentWicket(0);
                  setCurrentOverNumber(0);
                  setCurrentOverData([]);
                  setBallsData(null);
                }}
                variant="primary"
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default CricketScore;

const PRIMARY = "#2563EB";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },
  topRow: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: "#1E3A8A",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  teamContainer: {
    flex: 1,
  },
  teamText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
  },
  gameOverContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#F1F5F9",
  },
  winnerText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 16,
  },
  gameOverTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1E293B",
    marginBottom: 16,
  },
  textRight: {
    textAlign: "right",
  },
  vsBadge: {
    alignItems: "center",
    justifyContent: "center",
    width: 36,
    height: 36,
    backgroundColor: "#DC2626",
    borderRadius: 18,
    marginHorizontal: 12,
  },
  vsText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 14,
  },
  playAgainButton: {
    backgroundColor: PRIMARY,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  settingsScroll: {
    padding: 24,
  },
  setupCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
  },
  winnerIcon: {
    marginVertical: 16,
  },
  cardHeaderTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1E293B",
    marginBottom: 24,
  },
  settingGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  segment: {
    flexDirection: "row",
    backgroundColor: "#E2E8F0",
    borderRadius: 14,
    padding: 6,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  segmentButtonActive: {
    backgroundColor: PRIMARY,
  },
  segmentText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
  },
  segmentTextActive: {
    color: "#FFFFFF",
  },
  input: {
    backgroundColor: "#F9FAFB",
    padding: 16,
    borderWidth: 1.5,
    borderRadius: 14,
    borderColor: "#CBD5E1",
    fontSize: 16,
    color: "#0F172A",
    fontWeight: "600",
  },
  summaryBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    borderRadius: 14,
    padding: 16,
    gap: 12,
    marginBottom: 24,
  },
  summaryText: {
    flex: 1,
    color: "#1E40AF",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 22,
  },
  confirmBtn: {
    borderRadius: 14,
    paddingVertical: 16,
  },
  scoreContainer: {
    flex: 1,
    padding: 18,
  },
  mainScoreCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    marginBottom: 18,
  },
  scoreMainCol: {
    flex: 1,
  },
  scoreLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#475569",
    textTransform: "uppercase",
  },
  scoreValue: {
    fontSize: 38,
    fontWeight: "800",
    color: "#0F172A",
  },
  wicketText: {
    color: "#2563EB",
  },
  overSubText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#475569",
    marginTop: 4,
  },
  verticalDivider: {
    width: 1,
    height: "80%",
    backgroundColor: "#E2E8F0",
    marginHorizontal: 18,
  },
  chaseCol: {
    flex: 1,
  },
  needBadge: {
    backgroundColor: "#ECFDF5",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#A7F3D0",
  },
  needTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#047857",
    marginBottom: 4,
  },
  needDetailText: {
    fontSize: 13,
    color: "#065F46",
  },
  boldText: {
    fontWeight: "800",
  },
  analyticsContainer: {
    maxHeight: 100,
    marginBottom: 18,
  },
  analyticsContent: {
    gap: 14,
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 100,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  infoTitle: {
    fontSize: 11,
    fontWeight: "600",
    color: "#475569",
    marginTop: 6,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  overRowCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  overHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  overHeaderTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  overRunsSummary: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2563EB",
  },
  runRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    minHeight: 34,
  },
  emptyOverText: {
    fontSize: 13,
    color: "#9CA3AF",
    fontStyle: "italic",
  },
  runStatus: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  runText: {
    fontSize: 12,
    fontWeight: "700",
  },
  runBadgeNormal: {
    backgroundColor: "#E2E8F0",
  },
  runBadgeBoundary: {
    backgroundColor: "#D1FAE5",
  },
  runBadgeWicket: {
    backgroundColor: "#FECACA",
  },
  runBadgeExtra: {
    backgroundColor: "#FEF3C7",
  },
  keyboardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  keyboardTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#475569",
    marginBottom: 14,
    textTransform: "uppercase",
  },
  recordBallGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "flex-start",
  },
  fabSettings: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: PRIMARY,
    alignItems: "center",
    justifyContent: "center",
    elevation: 7,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
});
