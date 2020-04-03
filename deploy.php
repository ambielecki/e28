<?php
namespace Deployer;

require 'recipe/common.php';

// Project name
set('application', 'e28');

// Project repository
set('repository', 'git@github.com:ambielecki/e28.git');

// [Optional] Allocate tty for git clone. Default value is false.
set('git_tty', true); 

// Shared files/dirs between deploys 
set('shared_files', []);
set('shared_dirs', []);

// Writable dirs by web server 
set('writable_dirs', []);

set('bin/npm', function () {
    return run('which npm');
});

set('default_timeout', 600);

// Hosts

host('andrewbielecki.com')
    ->user('ambielecki')
    ->stage('production')
    ->set('deploy_path', '/var/www/html/e28');
    

// Tasks

desc('Deploy your project');
task('deploy', [
    'deploy:info',
    'deploy:prepare',
    'deploy:lock',
    'deploy:release',
    'deploy:update_code',
//    'deploy:shared',
//    'deploy:writable',
//    'deploy:vendors',
    'week9-install',
    'week9-build',
    'deploy:clear_paths',
    'deploy:symlink',
    'deploy:unlock',
    'cleanup',
    'success'
]);

task('week9-install', function () {
    if (has('previous_release')) {
        if (test('[ -d {{previous_release}}/week9/node_modules ]')) {
            run('cp -R {{previous_release}}/week9/node_modules {{release_path}}/week9');
        }
    }
    run("cd {{release_path}}/week9 && {{bin/npm}} ci");
});

task('week9-build', function () {
    run("cd {{release_path}}/week9 && {{bin/npm}} run build");
});

// [Optional] If deploy fails automatically unlock.
after('deploy:failed', 'deploy:unlock');
