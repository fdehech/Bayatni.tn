<header class="flex justify-between items-center relative z-50">
        <a href="index.php" class="domain">Bayatni.tn</a>
        
        <?php if ($isLoggedIn): ?>
        <nav class="nav">
            <div class="dropdown">
                <button class="btn dropdown-toggle d-flex align-items-center gap-1 text-white fw-semibold border-0 bg-transparent shadow-none" 
                        type="button" id="menuButton" data-bs-toggle="dropdown" aria-expanded="false" 
                        style="font-family: 'Poppins', sans-serif; font-weight: 400; font-size: 18px; text-transform: capitalize;">
                    <?= htmlspecialchars(isset($_SESSION['user_name']) ? $_SESSION['user_name'] : 'Mon Compte') ?>
                </button>
                <ul class="dropdown-menu dropdown-menu-end" style="position: absolute; z-index: 9999;">
                    <li><a class="dropdown-item" href="profile.php">Profile</a></li>
                    <li><a class="dropdown-item" href="booking.php">Réservations</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="logout.php">Déconnexion</a></li>
                </ul>
            </div>
        </nav>
        <?php else: ?>
            <nav class="space-x-2">
                <?php if ($current_page !== 'signup.php'): ?>
                    <a href="signup.php"><button type="button" class="nav-btn-inverse">S'inscrire</button></a>
                <?php endif; ?>
                
                <?php if ($current_page !== 'signin.php'): ?>
                    <a href="signin.php"><button type="button" class="nav-btn">S'identifier</button></a>
                <?php endif; ?>
            </nav>
        <?php endif; ?>
    </header>
