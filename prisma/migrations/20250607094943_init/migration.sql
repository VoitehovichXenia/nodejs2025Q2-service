-- CreateTable
CREATE TABLE "Favorites" (
    "id" TEXT NOT NULL,
    "artists" TEXT[],
    "tracks" TEXT[],
    "albums" TEXT[],

    CONSTRAINT "Favorites_pkey" PRIMARY KEY ("id")
);
