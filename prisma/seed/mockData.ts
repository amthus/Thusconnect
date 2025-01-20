import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const splitSql = (sql: string) => {
  return sql.split(';').filter(content => content.trim() !== '')
}

async function main() {
  const sql = `

INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('b8502b9d-6425-40af-8607-38bb5226d43b', '1Agnes.Trantow77@yahoo.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=3', 'inv789ghi', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('e74e3f96-b762-4c53-9119-4b981f12ba07', '17Keyshawn77@gmail.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=19', 'inv123abc', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('e5f648b3-e717-4b14-bff7-f1f60fb6e0fe', '25Marilyne_Prosacco@yahoo.com', 'Charlie Davis', 'https://i.imgur.com/YfJQV5z.png?id=27', 'inv123abc', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('21a98332-294d-4e7a-b27d-1162e6ac1c21', '33Antoinette.Christiansen62@gmail.com', 'Alice Jones', 'https://i.imgur.com/YfJQV5z.png?id=35', 'inv789ghi', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('137983f7-cd8a-453a-828a-16f88cc8fa2b', '41Maxwell.Franey@yahoo.com', 'Bob Brown', 'https://i.imgur.com/YfJQV5z.png?id=43', 'inv123abc', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('a5c0d0b7-0d69-430b-a956-5aaf11f808e5', '49Constance_Nienow12@yahoo.com', 'Bob Brown', 'https://i.imgur.com/YfJQV5z.png?id=51', 'inv123abc', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('cac14392-0bbd-452f-beb8-3d727495b8f0', '57Reba.Dooley@yahoo.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=59', 'inv012jkl', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('ef94afdf-5618-44cd-8e01-7c9bdd0ba9e5', '65Rosalinda.Roberts@hotmail.com', 'Charlie Davis', 'https://i.imgur.com/YfJQV5z.png?id=67', 'inv345mno', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('073c50ff-345b-42ae-8078-f48fcc40db2d', '73Kameron_Kutch@hotmail.com', 'Charlie Davis', 'https://i.imgur.com/YfJQV5z.png?id=75', 'inv456def', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('8e5ef9b7-94b9-43b7-8b5a-d3b1609686bc', 'dXNlcm5hbWU6cGFzc3dvcmQ', 'cac14392-0bbd-452f-beb8-3d727495b8f0');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('20c9e914-d119-4c20-acef-c218e3948d1a', 'dXNlcm5hbWU6cGFzc3dvcmQ', 'e74e3f96-b762-4c53-9119-4b981f12ba07');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('b04bb9f9-a7fd-4ec4-84e6-900407d9352a', 'dXNlcm5hbWU6cGFzc3dvcmQ', 'e74e3f96-b762-4c53-9119-4b981f12ba07');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('1dd7700b-9137-4c42-b767-ea9450f6a56e', 'dXNlcm5hbWU6cGFzc3dvcmQ', 'cac14392-0bbd-452f-beb8-3d727495b8f0');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('94ba4944-93f2-440b-9ff2-f24fde12898b', 'c29tZSBzYW1wbGUgdGV4dCBjb250ZW50', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('656b6350-c4bc-4e1b-82b7-296629b9e2cd', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c', 'cac14392-0bbd-452f-beb8-3d727495b8f0');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('0bf8c919-00b3-4f12-8334-21b24e676066', 'eyJ0eXBlIjoic3Vic2NyaXB0aW9uIiwicGF5bG9hZCI6InNvbWVjb250ZW50In0', '21a98332-294d-4e7a-b27d-1162e6ac1c21');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('03e2c8b7-6d3b-4f79-a058-366ecc93922b', 'eyJ1c2VySWQiOiIxMjM0NTYifQ', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('05e5af6e-7722-4837-adf0-befe948bcfd7', 'eyJ0eXBlIjoic3Vic2NyaXB0aW9uIiwicGF5bG9hZCI6InNvbWVjb250ZW50In0', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('186d7709-dbfd-47e2-ac30-75fc05051048', 'eyJ1c2VySWQiOiIxMjM0NTYifQ', 'cac14392-0bbd-452f-beb8-3d727495b8f0');

INSERT INTO "Conversation" ("id", "name", "type") VALUES ('59cb65b0-3ad6-4e79-88e3-087540ebfe90', 'Book Club', 'private');
INSERT INTO "Conversation" ("id", "name", "type") VALUES ('01989e2f-155f-482b-b4bc-b8eb253cd084', 'Project Team Chat', 'group');
INSERT INTO "Conversation" ("id", "name", "type") VALUES ('7fecfbb0-895b-45a5-a1e3-b5f99795cab0', 'Project Team Chat', 'group');
INSERT INTO "Conversation" ("id", "name", "type") VALUES ('a06baab3-91e7-4fc2-8f0e-86c7615ebc90', 'Book Club', 'group');
INSERT INTO "Conversation" ("id", "name", "type") VALUES ('fe8631c1-93f0-412e-8507-95af8e195439', 'Project Team Chat', 'private');
INSERT INTO "Conversation" ("id", "name", "type") VALUES ('ab5630ea-c823-484e-af9f-63f0d5005a8a', 'Family Group', 'group');
INSERT INTO "Conversation" ("id", "name", "type") VALUES ('102e3125-38d4-4385-83b5-eb186160e2f2', 'Family Group', 'private');
INSERT INTO "Conversation" ("id", "name", "type") VALUES ('4a4b3f0c-a879-4345-ac34-6b097b695052', 'Weekend Plans', 'group');
INSERT INTO "Conversation" ("id", "name", "type") VALUES ('e8a78d4b-9fbd-4c85-8b9f-15e67ef8c3c3', 'Book Club', 'group');
INSERT INTO "Conversation" ("id", "name", "type") VALUES ('61cc6e59-3920-4d72-9385-203952770fb4', 'Weekend Plans', 'group');

INSERT INTO "ConversationParticipant" ("id", "role", "conversationId", "userId") VALUES ('f78b9d8f-0e6b-4400-b935-a7995ad33b77', 'owner', '4a4b3f0c-a879-4345-ac34-6b097b695052', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "ConversationParticipant" ("id", "role", "conversationId", "userId") VALUES ('7d1a99fb-96d4-4b88-acab-4fcababae98d', 'moderator', 'fe8631c1-93f0-412e-8507-95af8e195439', '137983f7-cd8a-453a-828a-16f88cc8fa2b');
INSERT INTO "ConversationParticipant" ("id", "role", "conversationId", "userId") VALUES ('3a5a926e-2513-4cac-81e2-c2eaa63aa6ba', 'admin', '7fecfbb0-895b-45a5-a1e3-b5f99795cab0', 'b8502b9d-6425-40af-8607-38bb5226d43b');
INSERT INTO "ConversationParticipant" ("id", "role", "conversationId", "userId") VALUES ('c5bc24fb-6fc7-45be-ba92-262a6bd202d6', 'admin', 'e8a78d4b-9fbd-4c85-8b9f-15e67ef8c3c3', 'b8502b9d-6425-40af-8607-38bb5226d43b');
INSERT INTO "ConversationParticipant" ("id", "role", "conversationId", "userId") VALUES ('5050207f-d42c-4927-bed6-0e884d61e483', 'guest', '7fecfbb0-895b-45a5-a1e3-b5f99795cab0', '073c50ff-345b-42ae-8078-f48fcc40db2d');
INSERT INTO "ConversationParticipant" ("id", "role", "conversationId", "userId") VALUES ('6227069d-4f54-4100-92f4-7a37d04ebab6', 'moderator', '102e3125-38d4-4385-83b5-eb186160e2f2', 'e74e3f96-b762-4c53-9119-4b981f12ba07');
INSERT INTO "ConversationParticipant" ("id", "role", "conversationId", "userId") VALUES ('916e0e8e-8106-40cd-ad1d-8a25b7203ca6', 'owner', '7fecfbb0-895b-45a5-a1e3-b5f99795cab0', 'e5f648b3-e717-4b14-bff7-f1f60fb6e0fe');
INSERT INTO "ConversationParticipant" ("id", "role", "conversationId", "userId") VALUES ('73a69e32-c1a5-4092-8dd9-7ecff074dc94', 'owner', '4a4b3f0c-a879-4345-ac34-6b097b695052', 'ef94afdf-5618-44cd-8e01-7c9bdd0ba9e5');
INSERT INTO "ConversationParticipant" ("id", "role", "conversationId", "userId") VALUES ('6542fb5e-3900-4ea1-9969-2790a127743b', 'member', 'e8a78d4b-9fbd-4c85-8b9f-15e67ef8c3c3', 'e74e3f96-b762-4c53-9119-4b981f12ba07');
INSERT INTO "ConversationParticipant" ("id", "role", "conversationId", "userId") VALUES ('e5179e91-2c36-42fb-b4ea-94b279a9158c', 'member', '102e3125-38d4-4385-83b5-eb186160e2f2', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');

INSERT INTO "Message" ("id", "content", "type", "status", "conversationId", "userId") VALUES ('15ec348d-9fb4-454f-bd2d-61c8e6881260', 'Dont forget the meeting at 3 PM.', 'text', 'sent', 'a06baab3-91e7-4fc2-8f0e-86c7615ebc90', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Message" ("id", "content", "type", "status", "conversationId", "userId") VALUES ('6858f966-816b-45fd-9f1e-f65ffc6f22da', 'Check out this photo', 'text', 'delivered', '01989e2f-155f-482b-b4bc-b8eb253cd084', 'e5f648b3-e717-4b14-bff7-f1f60fb6e0fe');
INSERT INTO "Message" ("id", "content", "type", "status", "conversationId", "userId") VALUES ('5c320b36-9e26-48cd-8cda-11293284bb9c', 'Dont forget the meeting at 3 PM.', 'audio', 'delivered', 'a06baab3-91e7-4fc2-8f0e-86c7615ebc90', 'b8502b9d-6425-40af-8607-38bb5226d43b');
INSERT INTO "Message" ("id", "content", "type", "status", "conversationId", "userId") VALUES ('6c8adb1e-2eff-4b6b-af12-4411bd528af2', 'Check out this photo', 'image', 'read', '7fecfbb0-895b-45a5-a1e3-b5f99795cab0', '073c50ff-345b-42ae-8078-f48fcc40db2d');
INSERT INTO "Message" ("id", "content", "type", "status", "conversationId", "userId") VALUES ('9d8e94be-bc42-4fb1-ba6e-e6b25861eed9', 'Hello how are you', 'image', 'read', '4a4b3f0c-a879-4345-ac34-6b097b695052', 'b8502b9d-6425-40af-8607-38bb5226d43b');
INSERT INTO "Message" ("id", "content", "type", "status", "conversationId", "userId") VALUES ('1bd95fd0-4c5c-4ba7-befe-372527232d29', 'Hello how are you', 'image', 'failed', '4a4b3f0c-a879-4345-ac34-6b097b695052', 'ef94afdf-5618-44cd-8e01-7c9bdd0ba9e5');
INSERT INTO "Message" ("id", "content", "type", "status", "conversationId", "userId") VALUES ('ba50a0c9-410e-47e3-b310-6ab73a73bd6e', 'Can we meet tomorrow', 'text', 'delivered', '59cb65b0-3ad6-4e79-88e3-087540ebfe90', '21a98332-294d-4e7a-b27d-1162e6ac1c21');
INSERT INTO "Message" ("id", "content", "type", "status", "conversationId", "userId") VALUES ('37be7555-efe4-4b26-8948-1de426b34f7c', 'Hello how are you', 'text', 'sent', 'fe8631c1-93f0-412e-8507-95af8e195439', '137983f7-cd8a-453a-828a-16f88cc8fa2b');
INSERT INTO "Message" ("id", "content", "type", "status", "conversationId", "userId") VALUES ('138c8434-0beb-4b48-978b-ebe708e6ad6a', 'Hello how are you', 'audio', 'sent', '102e3125-38d4-4385-83b5-eb186160e2f2', '21a98332-294d-4e7a-b27d-1162e6ac1c21');
INSERT INTO "Message" ("id", "content", "type", "status", "conversationId", "userId") VALUES ('512b0b71-ffc1-46fc-abd8-8b4e21526873', 'Can we meet tomorrow', 'text', 'pending', 'a06baab3-91e7-4fc2-8f0e-86c7615ebc90', 'b8502b9d-6425-40af-8607-38bb5226d43b');

INSERT INTO "Contact" ("id", "status", "userId", "contactId") VALUES ('cf7b7f91-638a-4963-b92d-c0d108609171', 'blocked', '21a98332-294d-4e7a-b27d-1162e6ac1c21', 'e5f648b3-e717-4b14-bff7-f1f60fb6e0fe');
INSERT INTO "Contact" ("id", "status", "userId", "contactId") VALUES ('7c50373f-4392-4c8e-843b-1d1116bec0d0', 'blocked', 'a5c0d0b7-0d69-430b-a956-5aaf11f808e5', '21a98332-294d-4e7a-b27d-1162e6ac1c21');
INSERT INTO "Contact" ("id", "status", "userId", "contactId") VALUES ('0b2a79d5-88ed-4a76-ab4c-4ccd2c7f96e1', 'inactive', 'e5f648b3-e717-4b14-bff7-f1f60fb6e0fe', '137983f7-cd8a-453a-828a-16f88cc8fa2b');
INSERT INTO "Contact" ("id", "status", "userId", "contactId") VALUES ('fa186285-a685-419f-80b8-e082df965d50', 'archived', 'a5c0d0b7-0d69-430b-a956-5aaf11f808e5', 'cac14392-0bbd-452f-beb8-3d727495b8f0');
INSERT INTO "Contact" ("id", "status", "userId", "contactId") VALUES ('b7cd7aa6-ed3a-471b-9432-24d343162394', 'archived', 'b8502b9d-6425-40af-8607-38bb5226d43b', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Contact" ("id", "status", "userId", "contactId") VALUES ('99c25bb5-a56d-44b6-bfc8-a2bc2973ffa9', 'inactive', 'b8502b9d-6425-40af-8607-38bb5226d43b', '21a98332-294d-4e7a-b27d-1162e6ac1c21');
INSERT INTO "Contact" ("id", "status", "userId", "contactId") VALUES ('cf372e7f-c7d9-4bed-9de5-681d6026edfa', 'inactive', '137983f7-cd8a-453a-828a-16f88cc8fa2b', 'a5c0d0b7-0d69-430b-a956-5aaf11f808e5');
INSERT INTO "Contact" ("id", "status", "userId", "contactId") VALUES ('a16bf2a0-1548-4632-ae42-1b4a398f3626', 'archived', '21a98332-294d-4e7a-b27d-1162e6ac1c21', '073c50ff-345b-42ae-8078-f48fcc40db2d');
INSERT INTO "Contact" ("id", "status", "userId", "contactId") VALUES ('f51e6e37-6212-4a6b-9c41-ca497364b586', 'inactive', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '21a98332-294d-4e7a-b27d-1162e6ac1c21');
INSERT INTO "Contact" ("id", "status", "userId", "contactId") VALUES ('b4dc5d49-3b8c-434f-b84c-41b579c74e5f', 'archived', 'e74e3f96-b762-4c53-9119-4b981f12ba07', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');

INSERT INTO "Status" ("id", "content", "type", "expiresAt", "userId") VALUES ('37db8611-1cca-42cf-9f11-8ea56614b1ed', 'Busy with work catch you later.', 'text', '2024-04-03T15:02:12.616Z', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Status" ("id", "content", "type", "expiresAt", "userId") VALUES ('247dbaa3-b3e3-40d2-bc1b-60843697a8e1', 'Available for a chat.', 'video', '2024-10-07T02:10:58.448Z', 'cac14392-0bbd-452f-beb8-3d727495b8f0');
INSERT INTO "Status" ("id", "content", "type", "expiresAt", "userId") VALUES ('d23b1c35-f1f5-4603-b25e-7755e9be45c1', 'On vacation will reply next week.', 'image', '2025-02-09T19:33:59.632Z', '073c50ff-345b-42ae-8078-f48fcc40db2d');
INSERT INTO "Status" ("id", "content", "type", "expiresAt", "userId") VALUES ('30b1bf43-a980-410b-8016-98cb92d5f473', 'Available for a chat.', 'image', '2024-07-29T09:56:25.225Z', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Status" ("id", "content", "type", "expiresAt", "userId") VALUES ('a5fa6395-4ffd-4c38-aebe-695f77f5d1be', 'In a meeting please do not disturb.', 'image', '2024-10-14T10:02:26.274Z', '073c50ff-345b-42ae-8078-f48fcc40db2d');
INSERT INTO "Status" ("id", "content", "type", "expiresAt", "userId") VALUES ('a840a1c8-5f45-4e9d-9592-2f5f8f06a016', 'Feeling great today', 'text', '2024-06-25T22:07:01.227Z', 'a5c0d0b7-0d69-430b-a956-5aaf11f808e5');
INSERT INTO "Status" ("id", "content", "type", "expiresAt", "userId") VALUES ('0ac26449-ea24-43a9-b196-3bb72bee9ee1', 'Busy with work catch you later.', 'document', '2024-03-15T04:14:55.081Z', 'e74e3f96-b762-4c53-9119-4b981f12ba07');
INSERT INTO "Status" ("id", "content", "type", "expiresAt", "userId") VALUES ('de160270-b41c-4255-a140-dde697b9e11b', 'Busy with work catch you later.', 'document', '2025-01-11T01:03:19.445Z', '21a98332-294d-4e7a-b27d-1162e6ac1c21');
INSERT INTO "Status" ("id", "content", "type", "expiresAt", "userId") VALUES ('c017858c-e3f3-4997-98ac-08ee4bd29e52', 'On vacation will reply next week.', 'video', '2025-05-22T10:47:35.841Z', 'e74e3f96-b762-4c53-9119-4b981f12ba07');
INSERT INTO "Status" ("id", "content", "type", "expiresAt", "userId") VALUES ('91576631-c9b3-4614-bbd1-ad883685d450', 'Busy with work catch you later.', 'text', '2024-11-09T11:41:12.988Z', '137983f7-cd8a-453a-828a-16f88cc8fa2b');

  `

  const sqls = splitSql(sql)

  for (const sql of sqls) {
    try {
      await prisma.$executeRawUnsafe(`${sql}`)
    } catch (error) {
      console.log(`Could not insert SQL: ${error.message}`)
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
