CREATE TABLE signup (
    cus_id INTEGER Identity(1,1),
	CusID as 'Cus' + Right('0' + Cast(cus_id as varchar(3)), 3) persisted primary key,
	firstname nvarchar(40),
	lastname nvarchar(40),
	email varchar(40),
	phone_num varchar(11),
	pass varchar(40)
);


CREATE TABLE order1 (
    Or_id INTEGER Identity(1,1) ,
	OrID as 'Or' + Right('0' + Cast(Or_id as varchar(3)), 3) persisted primary key,
	CusID varchar(6),
    FOREIGN KEY(CusID) REFERENCES signup(CusID),
);

create table bookinfo(
	book_id int identity(1,1) ,
	BookID as 'Book' + Right('0' + Cast(book_id as varchar(3)), 3) persisted primary key,
	title varchar(100),
	author_name varchar(50),
	num_pages int,
	languages varchar(100),
	price decimal(5,2),
	quantity_books int
);

create table order_details(
	OrID varchar(5),
	BookID Varchar(7),
	quantity int,
	
	foreign key(OrID) references order1(OrID),
	foreign key(BookID) references bookinfo(BookID),
);




create table shipping(
	OrID varchar(5),
	CusID varchar(6), 
	street_number int,
	street_name varchar(40),
	country varchar(40),
	post_code int,

	foreign key(OrID) references order1(OrID),
	foreign key(CusID) references signup(CusID),
);

INSERT INTO bookinfo(title, author_name, price, languages, num_pages,quantity_books)
VALUES ('Empire of The Senseless', 'Acker Kathy', 17, 'German', 1246,100),
('In Memoriam To Identity', 'Acosta Oscar Zeta', 21, 'Polish', 325,100),
('Art Attack: A Short Cultural History of the Avant-Garde', 'Daugherty Francis Leo', 13, 'Croatian', 623,100),
('Gang Of Souls: A Generation Of Beat Poets', ' Davis Stephen', 10, 'German', 5867,100),
('Women Of The Left Bank: Paris 1900-1940', 'Franck Dan', 10, 'Czech', 345,100),
('The Goncourt Brothers', 'Franklin Benjamin V ed.', 22, 'French', 465,100),
('My Life and Loves in Greenwich Village', 'Frees Paul', 15, 'Portuguese', 456,100),
('My Sisters Hand In Mine', 'French Warren', 27, 'Czech', 743,100),
('Two Serious Ladies', 'Fritz James', 10, 'English', 485,100),
('Let It Come Down', 'Conners Peter', 18, 'Croatian', 245,100),
('Stories of Paul Bowles', 'Cook Bruce', 17, 'Spanish', 567,100),
('Paris By Night', 'Coolidge Clark', 29, 'Turkish', 247,100),
('A Prince Of Bohemia and Other Stories', 'Dale Rick', 21, 'French', 973,100),
('In Touch: The Letters Of Paul Bowles', 'Aronson Jerry', 26, 'French', 987,100),
('Upbeat: Nine Lives Of A Musical Cat', 'Aronson Marc', 29, 'German', 378,100),
('Literal Madness: Three Novels', 'Arrocha Victor M.', 16, 'Czech', 346,100),
('Abortion: An Historial Romance', 'Ash Mel', 24, 'Polish', 1246,100),
('Confederate General From Big Sur Dreaming Of Babylon Hawkline Monster', 'Atkinson Jay', 28, 'Turkish', 953,100),
('Edna Webster Collection of Undiscovered Writings', 'Baca Elmo', 15, 'Portuguese', 368,100),
('Hawkline Monster: A Gothic Western', 'Bair Deidre', 15, 'Portuguese', 973,100),
('June 30th June 30th', 'Baker Deborah', 16, 'Turkish', 9375,100),
('Loading Mercury with a Pitchfork', 'Baker Phil', 10, 'German', 683,100),
('Rommel Drives On Deep Into Egypt', 'Bald Wambly', 15, 'Spanish', 358,100),
('Sombrero Fallout: A Japanese Novel', 'Baldick Robert', 24, 'Czech', 987,100),
('Trout Fishing in America', 'Bogosian Eric', 17, 'German', 594,100),
('Unfortunate Woman', 'Bohemian Club', 12, 'Czech', 286,100),
('Charles Bukowski', 'Bostick Daisy', 24, 'Croatian', 589,100),
('Public Intellectual Work Of Allen Ginsberg', 'Bowles Jane', 21, 'Portuguese', 476,100),
('Did Christ Make Love?', 'Bowles Paul', 10, 'German', 496,100),
('As The Wolf Howls At My Door', 'C-SPAN', 14, 'Czech', 249,100),
('Double View', 'Calhoun Aada', 17, 'Turkish', 1246,100),
('Wake Up. Were Almost There', 'Campbell James', 29, 'German', 4596,100),
('Who Walk in Darkness', 'Campana Dino', 10, 'German', 793,100),
('Revolt Of The Cockroad People', 'Charters Samuel', 18, 'Polish', 583,100),
('How to Talk Dirty and Influence People', 'Cheney Anne', 15, 'Portuguese', 2457,100),
('From Bughouse Square To The Beat Generation', 'Cherkovski Neeli', 15, 'German', 467,100),
('Brunos Weekly', 'Cherry Red Records', 25, 'German', 258,100),
('Fragments of Greenwich Village', 'Cheuse Alan', 12, 'Croatian', 583,100),
('Greenwich Village', 'Christensen Mark', 23, 'Czech', 258,100),
('Sacred Band: A Litany Of Ingratitude', 'Christopher Tom', 18, 'German', 478,100),
('Firing Line: The Hippies', 'Christy Jim', 29, 'English', 735,100),
('Absence Of The Hero: Uncollected Stories And Essays Volume 2: 1946-1992', 'Churchill Allen', 24, 'German', 954,100),
('Beerspit Night and Cursing : The Correspondence of Charles Bukowski and Sheri Martinelli 1960-1967', 'Ciuraru Carmela', 15, 'Croatian', 638,100),
('Betting on the Muse: Poems & Stories', 'Clark Joshua ', 26, 'English', 579,100),
('Between the earthquake the volcano and the leopard', 'Du Maurier George', 16, 'Czech', 279,100),
('Bone Palace Ballet: New Poems', 'Duberman Martin', 10, 'Turkish', 347,100),
('Bring Me Your Love', 'Dullaghan John dir.', 24, 'Portuguese', 973,100),
('Burning In Water Drowning In Flame', 'Dunn Patrick W.', 30, 'Portuguese', 3457,100),
('Archetype West: The Pacific Coast As A Literary Region', 'Durrell Lawrence', 25, 'Croatian', 873,100),
('Crooked Lines Of God: Poems 1949-1954', 'Duxler Margot Beth', 27, 'Czech', 347,100),
('Engendering Flood: Book One of Dust Shall be the Serpents Fool (Cantos I-IV)', 'Eastman Max', 27, 'Turkish', 834,100),
('Man-Fate: The Swan Song Of Brother Antonius', 'Easton Malcolm', 27, 'Czech', 347,100),
('Prodigious Thrust', 'Edington Stephen D.', 10, 'Turkish', 683,100),
('River-Root: A Syzygy', 'Fink Larry', 16, 'Czech', 583,100),
('Residual Years', 'Fitch Noel Riley', 23, 'English', 583,100),
('Single Source: The Early Poems Of William Everson [1934-1940]', 'Ford Hugh', 17, 'Bulgarian', 579,100),
('Veritable Years: Poems 1949-1966 Volume II Of The Collected Poems)', 'Ford James L.', 20, 'Polish', 582,100),
('Long time coming and a long time come', 'Forte Robert editor', 15, 'Spanish', 3458,100),
('William Everson: a collection of books & manuscripts', 'Foster Edward Halsey', 15, 'Spanish',972,100),
('Robert Creeley: A Biography', 'Fosdick Gertrude Christian', 15, 'English', 863,100),
('Anai Nin: A Biography', 'Acker Kathy', 14, 'German', 990,100),
('On The Left Bank: 1929-1933', 'Wambly Bald', 15, 'French', 1000,100),
('SOS: Poems 1961-2013', 'Amiri Baraka', 13, 'English', 1001,100),
('Beatdom', 'Enzo', 15, 'English', 1011,100),
('Eulogies', 'Phyllis Theroux', 20, 'English', 1111,100)


