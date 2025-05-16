<?php
//  The name of the file to create
$filename = "chatbox_data.csv";

//  Open the file for writing.  'w' creates the file if it doesn't exist, and overwrites it if it does.
$file = fopen($filename, 'w');
if ($file === false) {
    die("Error opening the file.");
}

//  Write the header row (column names).  fputcsv() automatically adds quotes around strings if needed, and escapes special characters.
$header = array("Name", "Email", "Message");
fputcsv($file, $header);

// Get data from the form
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

//  Write the data row.
$data = array($name, $email, $message);
fputcsv($file, $data);

// Close the file.  It's important to do this to free up resources and ensure the data is written.
fclose($file);

//  Optional:  Send a download header so the browser prompts the user to download the CSV file.
header('Content-Type: text/csv');
header('Content-Disposition: attachment; filename="' . $filename . '"');
header('Expires: 0');         // No caching
header('Cache-Control: must-revalidate');
header('Pragma: public');
readfile($filename); //send the file to the user

//  IMPORTANT:  You should not have any HTML output before the headers, or readfile().  No echo, no print, no anything.
exit; // Stop further execution.
?>