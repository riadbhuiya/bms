-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 13, 2025 at 07:18 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bms`
--

-- --------------------------------------------------------

--
-- Table structure for table `balance`
--

CREATE TABLE `balance` (
  `bid` int(11) NOT NULL,
  `balance` int(11) NOT NULL,
  `uid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `balance`
--

INSERT INTO `balance` (`bid`, `balance`, `uid`) VALUES
(1, 50, 1001),
(2, 500, 1002);

-- --------------------------------------------------------

--
-- Table structure for table `branches`
--

CREATE TABLE `branches` (
  `branchID` int(11) NOT NULL,
  `branchName` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `branches`
--

INSERT INTO `branches` (`branchID`, `branchName`, `location`) VALUES
(1234, 'Mirpur', 'Mirpur 10'),
(1235, 'Ashulia', 'Ashulia');

-- --------------------------------------------------------

--
-- Table structure for table `loan`
--

CREATE TABLE `loan` (
  `lid` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `duration` int(11) NOT NULL CHECK (`duration` > 0),
  `installments` decimal(15,2) GENERATED ALWAYS AS (`amount` / `duration`) STORED,
  `bid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `loan`
--

INSERT INTO `loan` (`lid`, `amount`, `duration`, `bid`) VALUES
(1, 3000, 15, 1);

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `tid` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `sender_uid` int(11) NOT NULL,
  `receiver_uid` int(11) NOT NULL,
  `amount` int(11) NOT NULL CHECK (`amount` > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`tid`, `date`, `sender_uid`, `receiver_uid`, `amount`) VALUES
(1, '2025-03-21 15:19:45', 1001, 1002, 500);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `uid` int(11) NOT NULL,
  `fname` varchar(50) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `dob` date NOT NULL,
  `password` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `branchID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`uid`, `fname`, `lname`, `dob`, `password`, `address`, `email`, `phone`, `branchID`) VALUES
(1001, 'Riad', 'Bhuiya', '2025-03-20', 'hello', 'Changaon', 'riad@mail.com', '01711223344', 1234),
(1002, 'John', 'Wick', '1960-03-11', 'killer', 'Hollywood, California', 'jwkiller@email.com', '01811223344', 1235),
(1004, 'Tanjina', 'Akter', '2025-03-06', '123456', 'Geether', 'tanjina@mail.com', '01911223344', 1234),
(1007, 'Tanjina', 'Akter', '2025-03-11', '1234665', 'geeder', 'tanjinamailll.com', '01911223355', NULL),
(1008, 'Tanjina', 'Akter', '2025-03-11', '123456', 'geeder', 'tanjinamaillll.com', '01911223366', NULL),
(1009, 'Tanjina', 'Akter', '2025-03-11', '123456', 'geeder', 'tanjinamailllll.com', '01911223377', NULL),
(1012, 'abc', 'def', '2025-04-14', '123456', 'asdf;lskdfj', 'ac@mail.com', '01911223798', NULL),
(1013, 'admin', 'bank', '1996-05-11', 'admin', 'localhost', 'admin@mail.com', '01235749654', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `balance`
--
ALTER TABLE `balance`
  ADD PRIMARY KEY (`bid`),
  ADD KEY `uid` (`uid`);

--
-- Indexes for table `branches`
--
ALTER TABLE `branches`
  ADD PRIMARY KEY (`branchID`);

--
-- Indexes for table `loan`
--
ALTER TABLE `loan`
  ADD PRIMARY KEY (`lid`),
  ADD KEY `bid` (`bid`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`tid`),
  ADD KEY `sender_uid` (`sender_uid`),
  ADD KEY `receiver_uid` (`receiver_uid`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD KEY `branchID` (`branchID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `balance`
--
ALTER TABLE `balance`
  MODIFY `bid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `branches`
--
ALTER TABLE `branches`
  MODIFY `branchID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1236;

--
-- AUTO_INCREMENT for table `loan`
--
ALTER TABLE `loan`
  MODIFY `lid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `tid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1014;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `balance`
--
ALTER TABLE `balance`
  ADD CONSTRAINT `balance_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`);

--
-- Constraints for table `loan`
--
ALTER TABLE `loan`
  ADD CONSTRAINT `loan_ibfk_1` FOREIGN KEY (`bid`) REFERENCES `balance` (`bid`) ON DELETE CASCADE;

--
-- Constraints for table `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`sender_uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE,
  ADD CONSTRAINT `transaction_ibfk_2` FOREIGN KEY (`receiver_uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`branchID`) REFERENCES `branches` (`branchID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
