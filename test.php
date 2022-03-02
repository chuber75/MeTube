<html lang="en">
<head>
    <title>test</title>
</head>
<body>
    <form action="test.php?reload=true">
        <button> send </button>
        <?php
if(isset($_GET['reload'])) {
    $parameter = $_GET['reload'];
    if($parameter == 'true') {
        echo "<p style='color:red;'>Button was pressed</p>";
    }
}
?>
    </form>
</body>
</html>
