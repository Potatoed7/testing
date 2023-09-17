<?php

// read the request body as JSON
$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);

// read the existing leaderboard data from the JSON file
$leaderboardData = json_decode(file_get_contents('leaderboard.json'), true);

// add the new player data to the leaderboard
$leaderboardData[] = $data;

// sort the leaderboard by score in descending order
usort($leaderboardData, function($a, $b) {
  return $b['score'] - $a['score'];
});

// write the updated leaderboard data to the JSON file
file_put_contents('leaderboard.json', json_encode($leaderboardData));

// send a response to confirm that the leaderboard was updated
header('Content-Type: application/json');
echo json_encode(array('success' => true));
?>
