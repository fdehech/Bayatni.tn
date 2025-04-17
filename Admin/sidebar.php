<aside class="sidebar">
    <div class="sidebar-header">
        <h2>Bayatni</h2>
    </div>
    <nav class="sidebar-nav">
        <ul>
            <li <?php echo basename($_SERVER['PHP_SELF']) == 'index.php' ? 'class="active"' : ''; ?>>
                <a href="index.php"><i class="fas fa-tachometer-alt"></i> Dashboard</a>
            </li>
            <li <?php echo basename($_SERVER['PHP_SELF']) == 'hotels.php' ? 'class="active"' : ''; ?>>
                <a href="hotels.php"><i class="fas fa-hotel"></i> Hotels</a>
            </li>
            <li <?php echo basename($_SERVER['PHP_SELF']) == 'users.php' ? 'class="active"' : ''; ?>>
                <a href="users.php"><i class="fas fa-users"></i> Users</a>
            </li>
            <li <?php echo basename($_SERVER['PHP_SELF']) == 'reviews.php' ? 'class="active"' : ''; ?>>
                <a href="reviews.php"><i class="fas fa-star"></i> Reviews</a>
            </li>
            <li <?php echo basename($_SERVER['PHP_SELF']) == 'bookings.php' ? 'class="active"' : ''; ?>>
                <a href="bookings.php"><i class="fas fa-calendar-check"></i> Bookings</a>
            </li>
        </ul>
    </nav>
</aside>
