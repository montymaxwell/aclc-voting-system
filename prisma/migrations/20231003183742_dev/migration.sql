-- CreateTable
CREATE TABLE "party" (
    "name" TEXT NOT NULL,
    "acronym" TEXT,
    "members" TEXT[],

    CONSTRAINT "party_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "users" (
    "USN" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT USER,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "middleInitial" TEXT NOT NULL,
    "strand" TEXT NOT NULL,
    "voted" BOOLEAN DEFAULT false,
    "voteList" JSON[],
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("USN")
);

-- CreateTable
CREATE TABLE "candidates" (
    "name" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "middleInitial" TEXT NOT NULL,
    "icon" TEXT,
    "party" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "votes" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "candidates_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "votes" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "USN" TEXT NOT NULL,
    "candidate" TEXT NOT NULL,

    CONSTRAINT "votes_pkey" PRIMARY KEY ("id")
);
